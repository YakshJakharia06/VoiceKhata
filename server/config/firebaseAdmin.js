const admin = require("firebase-admin");

try {
  // Load the credentials directly using Render's absolute secret path
  const serviceAccount = require("/etc/secrets/firebase-credentials.json");

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://chatapp4r-default-rtdb.firebaseio.com"
    });
  }

  console.log("✅ Firebase Admin Initialized Successfully");
} catch (error) {
  console.error("❌ [Firebase Admin] Initialization error:", error.message);
}

module.exports = admin;