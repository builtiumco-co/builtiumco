const { google } = require('googleapis');

// Helper to get authorized Google Sheets client
async function getSheetsClient() {
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ? process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
    : null;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  
  if (!privateKey || !clientEmail) {
    throw new Error("Google credentials are not configured in environment variables.");
  }

  const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  return google.sheets({ version: 'v4', auth });
}

// Generate sheet headers if the sheet is empty
async function ensureHeaders(sheets, sheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A1:E1',
  });
  
  if (!response.data.values || response.data.values.length === 0) {
    const headers = [
      'Timestamp', 'Business Name', 'Email', 'Phone Number', 'Session ID', 
      'Completion Status', 'Final Stage Result', 
      'Score PROFILE', 'Score DISCOVERABILITY', 'Score WEBSITE', 'Score POSITIONING', 
      'Score SOCIAL_PROOF', 'Score SOCIAL_MEDIA', 'Score LEAD_CAPTURE', 'Score RETENTION', 
      'Score LEGAL', 'Score COMPETITIVE', 
      'Paid Unlock Status', 'Payment Timestamp', 'Follow-Up Segment'
    ];
    // Add Q1 to Q55
    for (let i = 1; i <= 55; i++) {
      headers.push(`Question ${i} Answer`);
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      resource: { values: [headers] },
    });
  }
}

// Check and mark older inactive sessions as "Abandoned"
async function checkAndMarkAbandoned(sheets, sheetId) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: 'Sheet1!A:T',
  });

  const rows = response.data.values;
  if (!rows || rows.length <= 1) return;

  const now = Date.now();
  const twoHoursMs = 2 * 60 * 60 * 1000;
  const updates = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const timestampStr = row[0]; // Col A
    const status = row[5]; // Col F
    const sessionId = row[4]; // Col E

    if (status === 'In Progress' && timestampStr) {
      const startTime = new Date(timestampStr).getTime();
      if (now - startTime > twoHoursMs) {
        const rowNumber = i + 1; // 1-indexed for sheets
        // We will update Column F (Status) to "Abandoned" and Column T (Follow-Up) to "Re-engage — Incomplete"
        updates.push({
          range: `Sheet1!F${rowNumber}`,
          values: [['Abandoned']]
        });
        updates.push({
          range: `Sheet1!T${rowNumber}`,
          values: [['Re-engage — Incomplete']]
        });
      }
    }
  }

  if (updates.length > 0) {
    for (const update of updates) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: update.range,
        valueInputOption: 'RAW',
        resource: { values: update.values },
      });
    }
    console.log(`Auto-marked ${updates.length / 2} expired sessions as Abandoned.`);
  }
}

exports.handler = async (event) => {
  // Enable CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { action, sessionId, data } = body;
    const sheetId = process.env.GOOGLE_SHEET_ID;

    if (!sheetId) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GOOGLE_SHEET_ID environment variable is missing.' })
      };
    }

    const sheets = await getSheetsClient();
    await ensureHeaders(sheets, sheetId);
    
    // Periodically flag abandoned sessions
    try {
      await checkAndMarkAbandoned(sheets, sheetId);
    } catch (err) {
      console.warn("Failed to check abandoned sessions:", err.message);
    }

    // Read all values to find the matching Session ID row
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:T',
    });

    const rows = getResponse.data.values || [];
    let rowIndex = -1;

    // Search for existing row matching sessionId in Col E (index 4)
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][4] === sessionId) {
        rowIndex = i + 1; // 1-indexed row number
        break;
      }
    }

    if (action === 'create') {
      if (rowIndex !== -1) {
        return {
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ success: true, message: 'Session already exists.', row: rowIndex })
        };
      }

      // Append new row for session
      const newRow = [
        new Date().toISOString(), // A: Timestamp
        data.businessName || '',  // B: Business Name
        data.email || '',         // C: Email
        data.phone || '',         // D: Phone Number
        sessionId,                // E: Session ID
        'In Progress',            // F: Completion Status
        '',                       // G: Final Stage Result
        '', '', '', '', '', '', '', '', '', '', // H-Q: scores
        'Not Purchased',          // R: Paid Unlock Status
        '',                       // S: Payment Timestamp
        'Re-engage — Incomplete'  // T: Follow-Up Segment
      ];

      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'Sheet1!A:A',
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        resource: { values: [newRow] },
      });

      return {
        statusCode: 200,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ success: true, message: 'Session row created.' })
      };
    }

    if (action === 'update') {
      if (rowIndex === -1) {
        return {
          statusCode: 404,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ error: 'Session not found. Cannot update.' })
        };
      }

      // Check if update is for a single question or final quiz completion
      if (data.type === 'answer') {
        const qNum = parseInt(data.questionNum, 10);
        const ansText = data.answerText || '';
        
        // Question columns start at U (Col 21, i.e., index 20 in 0-indexed values)
        // Col U is index 21, Col CS is Col 75
        const colLetter = getColumnLetter(21 + (qNum - 1));
        const cellRange = `Sheet1!${colLetter}${rowIndex}`;

        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: cellRange,
          valueInputOption: 'RAW',
          resource: { values: [[ansText]] },
        });

        return {
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ success: true, message: `Question ${qNum} saved.` })
        };
      }

      if (data.type === 'completion') {
        // Complete update containing final results, scores, status, follow-up segment
        const completionStatus = data.paid ? 'Completed — Purchased' : 'Completed — Not Purchased';
        const followUpSegment = data.paid ? 'Scheduling — Paid' : 'Upsell — Completed, No Purchase';

        const updateValues = [
          [
            completionStatus,          // F: Completion Status
            data.finalResult || '',    // G: Final Stage Result
            data.scores.PROFILE || 0,  // H: Score PROFILE
            data.scores.DISCOVERABILITY || 0, // I: Score DISCOVERABILITY
            data.scores.WEBSITE || 0,  // J: Score WEBSITE
            data.scores.POSITIONING || 0, // K: Score POSITIONING
            data.scores.SOCIAL_PROOF || 0, // L: Score SOCIAL_PROOF
            data.scores.SOCIAL_MEDIA || 0, // M: Score SOCIAL_MEDIA
            data.scores.LEAD_CAPTURE || 0, // N: Score LEAD_CAPTURE
            data.scores.RETENTION || 0,    // O: Score RETENTION
            data.scores.LEGAL || 0,        // P: Score LEGAL
            data.scores.COMPETITIVE || 0,  // Q: Score COMPETITIVE
            data.paid ? 'Purchased' : 'Not Purchased', // R: Paid Unlock Status
            data.paid ? new Date().toISOString() : '', // S: Payment Timestamp
            followUpSegment            // T: Follow-Up Segment
          ]
        ];

        await sheets.spreadsheets.values.update({
          spreadsheetId: sheetId,
          range: `Sheet1!F${rowIndex}:T${rowIndex}`,
          valueInputOption: 'RAW',
          resource: { values: updateValues },
        });

        return {
          statusCode: 200,
          headers: { 'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({ success: true, message: 'Session marked as completed.' })
        };
      }
    }

    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Invalid action/type parameter.' })
    };

  } catch (error) {
    console.error('Error in audit-log function:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message || 'Internal Server Error' })
    };
  }
};

// Helper function to map 1-indexed column numbers to A-Z/AA-ZZ Excel letter format
function getColumnLetter(colNum) {
  let temp;
  let letter = '';
  while (colNum > 0) {
    temp = (colNum - 1) % 26;
    letter = String.fromCharCode(65 + temp) + letter;
    colNum = (colNum - temp - 1) / 26;
  }
  return letter;
}
