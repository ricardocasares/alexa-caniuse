import * as Alexa from "ask-sdk-core";
import { launch, intents } from "../lib/guards";

const LaunchRequest: Alexa.RequestHandler = {
  canHandle: launch(intents("Start")),
  handle(input) {
    return input.responseBuilder
      .speak("Welcome to Can I Use!")
      .reprompt("Ask me about a CSS property")
      .getResponse();
  }
};

export default LaunchRequest;
