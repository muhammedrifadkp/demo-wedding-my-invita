# RSVP → Google Sheets setup

1. **Create the sheet.** In Google Sheets create a new, private spreadsheet. Rename the first tab to `RSVP`. In row 1 enter: `Timestamp`, `Full Name`, `Attendance`, `Message`. Do not share the sheet.
2. **Add the script.** In the sheet: Extensions → Apps Script. Replace the contents of `Code.gs` with `apps-script/Code.gs` from this project.
3. **Set the secret.** Apps Script → Project Settings → Script Properties → Add property `SECRET` with a long random value (e.g. 32+ random characters). Keep a copy.
4. **Deploy.** Deploy → New deployment → type *Web app*. Execute as: **Me**. Who has access: **Anyone**. Deploy, authorize when asked, and copy the **Web app URL** (ends in `/exec`). The URL alone is useless without the secret, and the sheet itself stays private because only the script (running as you) can read or write it.
5. **Connect the website.** Copy `.env.example` to `.env.local` and fill in:
   ```
   APPS_SCRIPT_URL=<Web app URL>
   APPS_SCRIPT_SECRET=<same value as SECRET>
   ```
   On Vercel: Project → Settings → Environment Variables → add both → redeploy. These are server-only (no `NEXT_PUBLIC_` prefix) and never reach the browser.
6. **Test.** Run the site, open the RSVP form, submit one "Yes" and one "Unable to attend" response (wait ~3 seconds after the page loads). Each should appear as a new row in the `RSVP` tab. Then submit a blank name to confirm validation.
7. **If you edit `Code.gs` later**, use Deploy → Manage deployments → Edit → New version, otherwise the old code keeps running.

8. **Admin page (`/admin`).** Set `ADMIN_PASSWORD` (long and random) in `.env.local` and on Vercel, then redeploy. The page asks for this password and shows all responses (counts, search, filter, CSV download). The client opens `https://<your-site>/admin`. Changing `ADMIN_PASSWORD` or `APPS_SCRIPT_SECRET` signs everyone out. The admin page needs the latest `Code.gs` (it adds a `list` action), so do step 7 after updating the script.
