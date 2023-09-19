export default interface ResponseMessageInterface {
  code: string;
  message: string;
  service: string;
  description: string;
  data?: any;
  err?: any;
}
