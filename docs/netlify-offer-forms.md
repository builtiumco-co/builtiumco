# Launch and Custom offer submissions

The Services page sends the `launch-brief` and `custom-solution` forms directly to Netlify Forms. Both forms are present in the static HTML so Netlify can detect them during deployment. They no longer call the `services-submit` Google Sheets/SMTP function.

## Activate submission capture

1. In the existing Netlify project's **Forms** settings, enable form detection if it is disabled.
2. Deploy the updated site after enabling detection. Netlify scans `services.html` in the published root directory for the two static form definitions.
3. Confirm that `launch-brief` and `custom-solution` appear in Forms.
4. Submit a clearly marked test through each deployed form. Confirm that the submission appears in Netlify with all its answers, including every selected checkbox.

The user manages email recipients and notifications manually in Netlify. This change configures submission capture and readable fields; notification settings are separate.

## Submission contents

The subject identifies the request and business:

- `Builtium | Launch project brief | Ade & Sons`
- `Builtium | Custom solution request | Ade & Sons`

Netlify controls the notification email's layout. Each submission supplies readable field names, a request type, and a next step. The `email` field retains its standard name for Netlify's Reply-To handling.

For Launch, the fields cover the business and contact details, industry, business description, website goals, brand assets, preferred pages, needed features, inspiration websites and additional notes.

For Custom, they cover the business and contact details, location, existing website, business goals, required services, existing assets, page count, accounts, payments, dashboard, customer capabilities, timeline, budget and additional information.

Checkbox selections are sent as a single multiline list per question. Unanswered optional questions say `Not specified`. The anti-spam honeypot stays empty for legitimate submissions. User-entered line breaks are removed from the business name in the email subject.

## Submission behavior

The modal shows success only after the Netlify Forms POST succeeds. A rejected request or network error shows the existing retry state and preserves the answers. The submit button blocks duplicate requests while a submission is pending. The Google Sheets and SMTP credentials are not needed for these two forms.

Netlify Dev does not emulate production Forms capture or email notifications. Local browser validation should intercept the POST and inspect its form-encoded body, exercise failures and retries, and verify that neither the old `services-submit` endpoint nor a Discord webhook is called. A live deployed submission is needed to verify Netlify capture and actual email delivery.

## Diagnose the submission error

A direct POST to the local Netlify Dev server returned HTTP 405 during investigation. This explains the error state in a local preview: the local static server is not Netlify's hosted Forms capture service. The form must be tested on a deployed Netlify site for actual capture.

For an error on the deployed site, check the POST status in the browser Network panel and confirm that both form names were detected in that deployment. If they are missing, enable detection and redeploy. Also check form usage limits and any domain redirects that could prevent the POST reaching the site. The browser console reports the rejected form name and HTTP status without logging customer answers.

The deployed site could not be inspected from this environment because its domains are blocked by the network proxy. Production capture remains unverified.

This change only covers the Launch and Custom offers. Other site forms and the audit/payment functions retain their existing behavior.
