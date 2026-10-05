const admin = require("firebase-admin");
const fs = require("fs");

try {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    "/etc/secrets/firebase-credentials.json";

  const serviceAccount = JSON.parse(fs.readFileSync(credPath, "utf8"));

  // getApps() exists in all modern versions; fall back to admin.apps if needed
  const { getApps } = require("firebase-admin/app");
  const alreadyInitialized = getApps().length > 0;

  if (!alreadyInitialized) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://chatapp4r-default-rtdb.firebaseio.com",
    });
  }

  console.log("✅ Firebase Admin Initialized Successfully");
} catch (error) {
  console.error("❌ [Firebase Admin] Initialization error:", error.message);
  console.error(error.stack);
}

module.exports = admin;