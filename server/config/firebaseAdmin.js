const fs = require("fs");
const { initializeApp, cert, getApps, getApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const { getDatabase } = require("firebase-admin/database");

let app;

try {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    "/etc/secrets/firebase-credentials.json";

  const serviceAccount = JSON.parse(fs.readFileSync(credPath, "utf8"));

  app = getApps().length
    ? getApp()
    : initializeApp({
        credential: cert(serviceAccount),
        databaseURL: "https://chatapp4r-default-rtdb.firebaseio.com",
      });

  console.log("✅ Firebase Admin Initialized Successfully");
} catch (error) {
  console.error("❌ [Firebase Admin] Initialization error:", error.message);
  console.error(error.stack);
}

// Compatibility shim so existing code like admin.auth().verifyIdToken(...) keeps working


const admin = {
  app,
  get apps() {
    return getApps();
  },
  auth: () => getAuth(app),
  firestore: () => getFirestore(app),
  database: () => getDatabase(app),
};

module.exports = admin;
