/**
 * Netlify Function: services-submit
 * Handles both Launch Brief and Custom Solution form submissions:
 *  - Writes a new row to the correct Google Sheet tab
 *  - Sends an internal notification email via Zoho SMTP
 *
 * Environment variables required:
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL
 *   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
 *   GOOGLE_SHEET_ID_SERVICES  (spreadsheet ID for services forms)
 *   ZOHO_EMAIL
 *   ZOHO_PASSWORD
 */

const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// ---- Google Sheets helper ----
async function getSheetsClient() {
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    ? process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
    : null;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;

  if (!privateKey || !clientEmail) {
    throw new Error('Google Service Account credentials are not configured.');
  }

  const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  return google.sheets({ version: 'v4', auth });
}

// ---- Ensure headers exist on a sheet tab ----
async function ensureHeaders(sheets, spreadsheetId, sheetName, headers) {
  const range = `${sheetName}!A1:${columnLetter(headers.length)}1`;
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range });
  if (!res.data.values || res.data.values.length === 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      resource: { values: [headers] }
    });
  }
}

function columnLetter(n) {
  // Convert 1-based column index to letter (A, B, … Z, AA …)
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

// ---- Append a row to a named sheet tab ----
async function appendRow(sheets, spreadsheetId, sheetName, values) {
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A1`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: [values] }
  });
}

// ---- Zoho SMTP email helper ----
async function sendNotificationEmail(subject, htmlBody) {
  const zohoUser = process.env.ZOHO_EMAIL || 'hello@builtiumco.com';
  const zohoPass = process.env.ZOHO_PASSWORD;

  if (!zohoPass) {
    console.warn('ZOHO_PASSWORD not set — skipping email notification.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: { user: zohoUser, pass: zohoPass }
  });

  await transporter.sendMail({
    from: `"Builtium Studio" <${zohoUser}>`,
    to: 'hello@builtiumco.com',
    subject,
    html: htmlBody
  });
}

// ---- Sheet definitions ----
const LAUNCH_HEADERS = [
  'Timestamp',
  'Business Name',
  'Contact Name',
  'Email Address',
  'Phone/WhatsApp',
  'Business Industry',
  'Business Description',
  'Website Goals',
  'Existing Brand Assets',
  'Preferred Pages',
  'Preferred Features',
  'Inspiration Websites',
  'Additional Notes',
  'Status'
];

const CUSTOM_HEADERS = [
  'Timestamp',
  'Business Name',
  'Industry',
  'Business Location',
  'Contact Name',
  'Email Address',
  'Phone Number',
  'Existing Website',
  'Business Goals',
  'Services Required',
  'Has Existing Assets',
  'Page Count',
  'Needs User Accounts',
  'Needs Online Payments',
  'Needs Admin Dashboard',
  'Customer Capabilities Needed',
  'Timeline',
  'Budget Range',
  'Additional Information',
  'Status'
];

// ---- Ensure both sheet tabs exist ----
async function ensureSheetTabs(sheets, spreadsheetId) {
  const meta = await sheets.spreadsheets.get({ spreadsheetId });
  const existing = meta.data.sheets.map(s => s.properties.title);

  const needed = ['Launch Briefs', 'Custom Solution Requests'];
  const toAdd = needed.filter(n => !existing.includes(n));

  if (toAdd.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: toAdd.map(title => ({
          addSheet: { properties: { title } }
        }))
      }
    });
  }
}

// ============================================================
// MAIN HANDLER
// ============================================================
exports.handler = async (event) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const { formType } = body;
  if (!formType || !['launch', 'custom'].includes(formType)) {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'formType must be "launch" or "custom".' }) };
  }

  // Basic required field guard
  const requiredFields = ['businessName', 'contactName', 'email', 'phone'];
  for (const f of requiredFields) {
    if (!body[f] || !body[f].trim()) {
      return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: `Missing required field: ${f}` }) };
    }
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID_SERVICES;
  if (!spreadsheetId) {
    console.error('GOOGLE_SHEET_ID_SERVICES not set.');
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server configuration error — sheet ID missing.' }) };
  }

  const timestamp = new Date().toISOString();
  const sheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  try {
    const sheets = await getSheetsClient();

    // Make sure both tabs exist
    await ensureSheetTabs(sheets, spreadsheetId);

    if (formType === 'launch') {
      // -- Ensure headers --
      await ensureHeaders(sheets, spreadsheetId, 'Launch Briefs', LAUNCH_HEADERS);

      // -- Build row --
      const row = [
        timestamp,
        body.businessName || '',
        body.contactName || '',
        body.email || '',
        body.phone || '',
        body.industry || '',
        body.businessDescription || '',
        body.websiteGoals || '',
        body.brandAssets || '',
        body.preferredPages || '',
        body.preferredFeatures || '',
        body.inspirationWebsites || '',
        body.additionalNotes || '',
        'New — Awaiting Proposal'
      ];

      await appendRow(sheets, spreadsheetId, 'Launch Briefs', row);

      // -- Email notification --
      try {
        await sendNotificationEmail(
          `New Launch Project Brief — ${body.businessName}`,
          `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
            <h2 style="color:#3a7bff;border-bottom:2px solid #3a7bff;padding-bottom:8px;">New Launch Project Brief</h2>
            <p>A new project brief has been submitted via the Builtium Services page.</p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;width:40%;">Business Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.businessName}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Contact Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.contactName}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Phone / WhatsApp</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.phone}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Industry</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.industry || '—'}</td></tr>
            </table>
            <p><a href="${sheetUrl}#gid=launch" style="display:inline-block;padding:10px 20px;background:#3a7bff;color:#fff;text-decoration:none;border-radius:6px;">Open Launch Briefs Sheet</a></p>
            <p style="color:#94a3b8;font-size:12px;">Submitted: ${timestamp}</p>
          </div>
          `
        );
      } catch (emailErr) {
        console.error('Email notification failed (non-fatal):', emailErr.message);
      }

    } else {
      // -- Custom Solution --
      await ensureHeaders(sheets, spreadsheetId, 'Custom Solution Requests', CUSTOM_HEADERS);

      const row = [
        timestamp,
        body.businessName || '',
        body.industry || '',
        body.businessLocation || '',
        body.contactName || '',
        body.email || '',
        body.phone || '',
        body.existingWebsite || '',
        body.businessGoals || '',
        body.servicesRequired || '',
        body.existingAssets || '',
        body.pageCount || '',
        body.userAccounts || '',
        body.onlinePayments || '',
        body.adminDashboard || '',
        body.customerCapabilities || '',
        body.timeline || '',
        body.budgetRange || '',
        body.additionalInformation || '',
        'New — Awaiting Review'
      ];

      await appendRow(sheets, spreadsheetId, 'Custom Solution Requests', row);

      // -- Email notification --
      try {
        await sendNotificationEmail(
          `New Custom Solution Request — ${body.businessName}`,
          `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1e293b;line-height:1.6;">
            <h2 style="color:#3a7bff;border-bottom:2px solid #3a7bff;padding-bottom:8px;">New Custom Solution Request</h2>
            <p>A new custom solution request has been submitted via the Builtium Services page.</p>
            <table style="width:100%;border-collapse:collapse;margin:20px 0;">
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;width:40%;">Business Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.businessName}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Contact Name</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.contactName}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;"><a href="mailto:${body.email}">${body.email}</a></td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Phone</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.phone}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Budget Range</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.budgetRange || '—'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Timeline</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.timeline || '—'}</td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;font-weight:600;">Services Required</td><td style="padding:8px 0;border-bottom:1px solid #f1f5f9;">${body.servicesRequired || '—'}</td></tr>
            </table>
            <p><a href="${sheetUrl}" style="display:inline-block;padding:10px 20px;background:#3a7bff;color:#fff;text-decoration:none;border-radius:6px;">Open Custom Solution Requests Sheet</a></p>
            <p style="color:#94a3b8;font-size:12px;">Submitted: ${timestamp}</p>
          </div>
          `
        );
      } catch (emailErr) {
        console.error('Email notification failed (non-fatal):', emailErr.message);
      }
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ success: true, message: 'Form submitted successfully.' })
    };

  } catch (err) {
    console.error('services-submit error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' })
    };
  }
};
