import { bucket } from "../firebase/firebaseAdmin";
import UploadInterface from "../interfaces/UploadInterface";
import { UploadFileRequest } from "../models/Request/UploadImgRequestModel";
import { Writable } from "stream";

async function uploadImg(selectedFile: UploadInterface): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const { originalname, mimetype, buffer, size } = selectedFile;
      const uniqueFilename = Date.now() + "-" + originalname;

      const fileUpload = bucket.file(uniqueFilename);
      const stream = fileUpload.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
      });

      stream.on("error", (err) => {
        console.error("Error uploading file to Firebase Storage", err);
        reject(err);
      });

      stream.on("finish", async () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        resolve(publicUrl);
      });

      stream.end(buffer);
    } catch (error) {
      console.error("Internal Server Error", error);
      reject(error);
    }
  });
}

const UploadServices = {
  uploadImg,
};

export default UploadServices;
