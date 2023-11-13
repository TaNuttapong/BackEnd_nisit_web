import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "../../serviceAccountKey.json";

const serviceAccountCredentials: ServiceAccount =
  serviceAccount as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredentials),
  storageBucket: process.env.STORAGE_BUCKET,
});

export const bucket = admin.storage().bucket();
