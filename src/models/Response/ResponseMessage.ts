import StatusModel from "../StatusModel";

export default interface ResponseMessage {
  status: StatusModel;
  data?: any;
}
