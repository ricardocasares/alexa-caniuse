import * as api from "caniuse-api";
import { RequestHandler } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { intents } from "../lib/guards";
import { toSlotID } from "../lib/helpers";

const CanIUseRequest: RequestHandler = {
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

    const support = api.getSupport(toSlotID(feature));

    return responseBuilder
      .speak("Welcome to Can I Use")
      .reprompt("Ask me about a CSS property")
      .getResponse();
  }
};

export default CanIUseRequest;
