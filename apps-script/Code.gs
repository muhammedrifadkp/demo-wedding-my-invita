/**
 * RSVP receiver for the wedding site. Bound to a private Google Sheet.
 * Script Properties required:  SECRET  (same value as APPS_SCRIPT_SECRET on the website)
 * Sheet tab name: "RSVP" with header row: Timestamp | Full Name | Attendance | Message
 */
var SHEET_NAME = "RSVP";
var NAME_MAX = 80, MSG_MAX = 500;
var ATTENDANCE = ["Yes, Insha Allah", "Sorry, unable to attend"];

function doPost(e) {
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var secret = PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || body.secret !== secret) return out_({ ok: false, error: "forbidden" });
    if (body.action === "list") return out_({ ok: true, rows: list_() });

    var name = clean_(body.name, NAME_MAX);
    var attendance = String(body.attending || "");
    var message = clean_(body.message, MSG_MAX);
    if (name.length < 2 || ATTENDANCE.indexOf(attendance) === -1) return out_({ ok: false, error: "invalid" });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      // Abuse guard: ignore an identical repeat within 10 minutes; cap total submissions per hour.
      var cache = CacheService.getScriptCache();
      var key = "d_" + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, name.toLowerCase() + "|" + attendance + "|" + message));
      if (cache.get(key)) return out_({ ok: true, duplicate: true });
      var hourKey = "h_" + Utilities.formatDate(new Date(), "UTC", "yyyyMMddHH");
      var count = Number(cache.get(hourKey) || 0);
      if (count >= 200) return out_({ ok: false, error: "busy" });
      cache.put(hourKey, String(count + 1), 3600);
      cache.put(key, "1", 600);

      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
      if (!sheet) return out_({ ok: false, error: "no_sheet" });
      sheet.appendRow([new Date(), safe_(name), attendance, safe_(message)]);
    } finally {
      lock.releaseLock();
    }
    return out_({ ok: true });
  } catch (err) {
    return out_({ ok: false, error: "server" });
  }
}

// Used by the website's /admin page (secret required). Returns the latest 5000 responses, oldest first.
function list_() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow() < 2) return [];
  var n = Math.min(sheet.getLastRow() - 1, 5000);
  return sheet.getRange(sheet.getLastRow() - n + 1, 1, n, 4).getValues().map(function (r) {
    return { time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), name: String(r[1]), attending: String(r[2]), message: String(r[3]) };
  });
}

// Visiting the URL in a browser reveals nothing.
function doGet() { return out_({ ok: false, error: "post_only" }); }

function clean_(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/[ \t]+/g, " ").trim().substring(0, max);
}
// Prevent spreadsheet formula injection (=, +, -, @ at the start of a cell).
function safe_(s) { return /^[=+\-@]/.test(s) ? "'" + s : s; }
function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
