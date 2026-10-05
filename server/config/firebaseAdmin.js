const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

try {
  const credPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  
  if (!credPath) {
    throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not set in Environment Variables.");
  }

  // Resolve the path and check if the file exists
  const absolutePath = path.resolve(credPath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Could not find the Firebase JSON file at: ${absolutePath}. Check your Render Secret Files!`);
  }

  // Read the file manually (This replaces Firebase's 'require' method so it works on Render)
  const rawData = fs.readFileSync(absolutePath, 'utf8');
  const serviceAccount = JSON.parse(rawData);

  // Initialize Firebase with BOTH the credentials and your database URL
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chatapp4r-default-rtdb.firebaseio.com"
  });
  
  console.log("✅ Firebase Admin Initialized Successfully");
} catch (error) {
  console.error("❌ [Firebase Admin] Initialization error:", error.message);
}

module.exports = admin;