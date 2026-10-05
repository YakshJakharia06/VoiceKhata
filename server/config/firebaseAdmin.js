const admin = require("firebase-admin");
const fs = require("fs");

try {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    "/etc/secrets/firebase-credentials.json";

  const serviceAccount = JSON.parse(fs.readFileSync(credPath, "utf8"));

  // Safe diagnostics (no secret values printed)
  console.log("[Firebase Debug] keys:", Object.keys(serviceAccount));
  console.log("[Firebase Debug] project_id:", serviceAccount.project_id);
  console.log("[Firebase Debug] client_email:", serviceAccount.client_email);
  console.log(
    "[Firebase Debug] private_key ok:",
    typeof serviceAccount.private_key === "string" &&
      serviceAccount.private_key.startsWith("-----BEGIN PRIVATE KEY-----") &&
      serviceAccount.private_key.trim().endsWith("-----END PRIVATE KEY-----")
  );

  if (!admin.apps.length) {
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