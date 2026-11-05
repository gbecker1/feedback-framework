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
  apiKey:            "AIzaSyCIJhakAxgja33_QQ-qSSx5i4W5g-17ffA",
  authDomain:        "givaudan-feedback.firebaseapp.com",
  databaseURL:       "https://givaudan-feedback-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "givaudan-feedback",
  storageBucket:     "givaudan-feedback.firebasestorage.app",
  messagingSenderId: "826272184007",
  appId:             "1:826272184007:web:d750e3f3413438937530e2",
};

export const isConfigured = !Object.values(firebaseConfig).some(
  (v) => typeof v === "string" && v.includes("REPLACE_ME")
);
