const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

try {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
  if (!credPath) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not set in Environment Variables.");
  }

  const absolutePath = path.resolve(credPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Could not find the Firebase JSON file at: ${absolutePath}`);
  }

  const rawData = fs.readFileSync(absolutePath, 'utf8');
  const serviceAccount = JSON.parse(rawData);

  // Initialize Firebase safely
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: serviceAccount.project_id,
        privateKey: serviceAccount.private_key,
        clientEmail: serviceAccount.client_email
      }),
      databaseURL: "https://chatapp4r-default-rtdb.firebaseio.com"
    });
  }
  
  console.log("✅ Firebase Admin Initialized Successfully");
} catch (error) {
  console.error("❌ [Firebase Admin] Initialization error:", error.message);
}

module.exports = admin;