import { UploadFileRequest } from "../models/Request/UploadImgRequestModel";

function uploadImg(selectedFile: File) {
  return new Promise<string>((resolve, reject) => {
    if (!selectedFile) {
      console.warn("No file selected.");
      reject(new Error("No file selected")); // Reject the promise if no file is selected
      return;
    }

    const fileRef = bucket.file(selectedFile.name);
    const stream = fileRef.createWriteStream({
      metadata: {
        contentType: selectedFile.type,
      },
    });

    stream.on("error", (error) => {
      console.error("Error uploading file:", error);
      reject(error); // Reject the promise on error
    });

    stream.on("finish", async () => {
      try {
        // Get the download URL after the file is successfully uploaded
        const downloadUrl = await fileRef.getSignedUrl({
          action: "read",
          expires: "03-09-2500", // Set an appropriate expiration date
        });
        console.log("File uploaded successfully!");
        resolve(downloadUrl[0]); // Resolve the promise with the download URL
      } catch (error) {
        console.error("Error getting download URL:", error);
        reject(error); // Reject the promise on error
      }
    });

    stream.end(selectedFile);
  });
}

const UploadServices = {
  uploadImg,
};

export default UploadServices;
