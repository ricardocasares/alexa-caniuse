import * as Alexa from "ask-sdk-core";
import { launch as canHandle } from "../lib/guards";

const LaunchRequest: Alexa.RequestHandler = {
  canHandle,
  handle(input) {
    return input.responseBuilder
      .speak("Welcome to Can I Use!")
      .reprompt("Ask me about a CSS property")
      .getResponse();
  }
};

export default LaunchRequest;
