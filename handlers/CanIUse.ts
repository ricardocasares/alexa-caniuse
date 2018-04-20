import * as api from "caniuse-api";
import * as Alexa from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { intents } from "../lib/guards";
import { resolveSlots, featureResolver, humanReadable } from "../lib/helpers";

const CanIUseRequest: Alexa.RequestHandler = {
  canHandle: intents("CanIUse"),
  handle({ responseBuilder, requestEnvelope: { request } }) {
    const {
      intent: { slots }
    } = request as IntentRequest;
    let { feature, browser, version } = resolveSlots(slots);

    if (!feature.value) {
      return responseBuilder
        .speak("Please tell me a feature")
        .reprompt("tell me a feature")
        .addElicitSlotDirective("feature")
        .getResponse();
    }

    if (!feature.resolved) {
      feature = featureResolver(feature);
    }

    if (browser.value && !version.value) {
      return responseBuilder
        .speak("Which version?")
        .reprompt("Which version?")
        .addElicitSlotDirective("version")
        .getResponse();
    }

    if (browser.value) {
      try {
        const browserVersion = `${browser.id} ${version.value}`;
        const supported = api.isSupported(feature.id, browserVersion);

        let speech = supported ? "Hell yeah!" : "Nope";

        return responseBuilder
          .speak(speech)
          .reprompt(speech)
          .getResponse();
      } catch (error) {
        console.log(error);
        return responseBuilder
          .speak(`Sorry, I didn't get that, try again`)
          .reprompt("Ask me about a CSS property")
          .getResponse();
      }
    }

    try {
      const { id } = featureResolver(feature);
      const support = humanReadable(api.getSupport(id));

      return responseBuilder
        .speak(`You can use ${id} on the following browsers: ${support}`)
        .reprompt("Ask me about a CSS property")
        .getResponse();
    } catch (error) {
      console.log(error);
      return responseBuilder
        .speak(`Sorry, I didn't get that, try again`)
        .reprompt("Ask me about a CSS property")
        .getResponse();
    }
  }
};

export default CanIUseRequest;
