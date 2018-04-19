import * as Alexa from "ask-sdk-core";
import { sessionEnded as canHandle } from "../lib/guards";

const SessionEndedRequest = {
  canHandle,
  handle(input) {
    return input.responseBuilder.getResponse();
  }
};

export default SessionEndedRequest;
