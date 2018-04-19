import * as Alexa from "ask-sdk-core";

const ErrorHandler: Alexa.ErrorHandler = {
  canHandle(input: Alexa.HandlerInput, error: Error) {
    return true;
  },
  handle(input: Alexa.HandlerInput, error: Error) {
    console.log(error);
    return input.responseBuilder.getResponse();
  }
};

export default ErrorHandler;
