import * as api from "caniuse-api";
import * as Alexa from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { intents } from "../lib/guards";
import { toSlotID, humanReadable } from "../lib/helpers";

const CanIUseRequest: Alexa.RequestHandler = {
  canHandle: intents("CanIUse"),
  handle({ responseBuilder, requestEnvelope: { request } }) {
    const {
      intent: { slots }
    } = request as IntentRequest;
    const { feature } = slots;

    if (!feature) {
      return responseBuilder
        .speak("Please tell me a feature")
        .reprompt("tell me a feature")
        .getResponse();
    }
    const { id, name } = toSlotID(feature);
    const support = humanReadable(api.getSupport(id));

    return responseBuilder
      .speak(support)
      .reprompt("Ask me about a CSS property")
      .getResponse();
  }
};

export default CanIUseRequest;
