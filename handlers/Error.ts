import Alexa, { HandlerInput, ErrorHandler } from "ask-sdk-core";

const ErrorHandler: ErrorHandler = {
  canHandle(input: HandlerInput, error: Error) {
    return true;
  },
  handle(input: HandlerInput, error: Error) {
    console.log(error);
    return input.responseBuilder.getResponse();
  }
};

export default ErrorHandler;
