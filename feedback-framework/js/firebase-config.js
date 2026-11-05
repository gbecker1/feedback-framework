// ===========================================================================
// Firebase configuration
// ===========================================================================
// Paste your Firebase web-app config values below (see setup.html, step 7).
//
// While any value still contains REPLACE_ME, the app runs in LOCAL PREVIEW
// mode: the form works and shows the thank-you screen, but submissions are kept
// only in this browser (localStorage) instead of being sent to Firebase. That
// lets you review the pages before wiring up the live database.
// ===========================================================================

export const firebaseConfig = {
  apiKey:            "REPLACE_ME",
  authDomain:        "REPLACE_ME",
  databaseURL:       "REPLACE_ME",
  projectId:         "REPLACE_ME",
  storageBucket:     "REPLACE_ME",
  messagingSenderId: "REPLACE_ME",
  appId:             "REPLACE_ME",
};

export const isConfigured = !Object.values(firebaseConfig).some(
  (v) => typeof v === "string" && v.includes("REPLACE_ME")
);
