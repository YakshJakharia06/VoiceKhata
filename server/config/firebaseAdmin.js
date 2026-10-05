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

  // Fix escaped newlines in the private key if any exist
  if (serviceAccount.private_key) {
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
  }

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