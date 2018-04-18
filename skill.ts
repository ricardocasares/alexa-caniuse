import * as api from "caniuse-api";
import * as Alexa from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";

const LaunchRequest: Alexa.RequestHandler = {
  canHandle(input: Alexa.HandlerInput): boolean {
    const type = input.requestEnvelope.request.type;
    return type === "LaunchRequest";
  },
  handle(input) {
    return input.responseBuilder
      .speak("Welcome to Can I Use")
      .reprompt("Ask me about a CSS property")
      .getResponse();
  }
};

const CanIUseRequest: Alexa.RequestHandler = {
  canHandle(input: Alexa.HandlerInput): boolean {
    const type = input.requestEnvelope.request.type;
    const intent = (input.requestEnvelope.request as IntentRequest).intent;
    return type === "IntentRequest" && intent.name === "CanIUse";
  },
  handle(input) {
    const request = <IntentRequest>input.requestEnvelope.request;
    const slots = request.intent.slots;
    const { feature } = slots;

    if (!feature) {
      return input.responseBuilder
        .speak("Please tell me a feature")
        .reprompt("tell me a feature")
        .getResponse();
    }

    const support = api.getSupport(toSlotID(feature));

    return input.responseBuilder
      .speak("Welcome to Can I Use")
      .reprompt("Ask me about a CSS property")
      .getResponse();
  }
};

const ErrorHandler: Alexa.RequestHandler = {
  canHandle(input: Alexa.HandlerInput) {
    return true;
  },
  handle(input: Alexa.HandlerInput) {
    return input.responseBuilder.getResponse();
  }
};

export const handler = async event =>
  Alexa.SkillBuilders.custom()
    .addRequestHandlers(LaunchRequest, CanIUseRequest)
    .addErrorHandlers(ErrorHandler)
    .lambda();

function toSlotID(slot) {
  // THIS IS INSECURE @TODO: MAKE CHECKS FOR MISSING STUFF AND FAILOVERS
  const { name, resolutions } = slot;
  const { resolutionsPerAuthority } = resolutions;
  const [resolution] = resolutionsPerAuthority;
  const {
    values,
    status: { code }
  } = resolution;
  const [first] = values;

  return { name, id: first.id };
}

function humanReadable(support) {
  return Object.keys(support)
    .map(browser => {
      const vers = support[browser];
      if (!vers.y) return `${browser} is not supported.`;
      return `${browser} since version ${vers.y}`;
    })
    .join("\n");
}
