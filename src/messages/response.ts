import ResponseMessageInterface from "../interfaces/ResponseMessageInterface";
import ResponseMessage from "../models/Response/ResponseMessage";

function createResponseMessage({
  code,
  message,
  service,
  description,
  data,
  err,
}: ResponseMessageInterface) {
  const status = {
    code,
    message,
    service,
    description,
    ...(err !== undefined && err !== null ? { error: err } : {}),
  };

  const response: ResponseMessage = {
    status,
    data,
  };
  return response;
}

export default createResponseMessage;
