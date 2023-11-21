export default interface UploadInterface {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}
