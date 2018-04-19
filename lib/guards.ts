import { HandlerInput } from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { REQUEST_TYPES } from "./constants";

export function intents(
  ...names: string[]
): (HandlerInput) => boolean | Promise<boolean> {
  return function(input: HandlerInput): boolean | Promise<boolean> {
    const {
      requestEnvelope: { request }
    } = input;

    const { type } = request;

    if (type === REQUEST_TYPES.INTENT_REQUEST) {
      const {
        intent: { name }
      } = request as IntentRequest;

      return names.includes(name);
    }

    return false;
  };
}

export function launch(
  fn?: (HandlerInput) => boolean | Promise<boolean>
): (HandlerInput) => boolean | Promise<boolean> {
  return function(input: HandlerInput): boolean | Promise<boolean> {
    const {
      requestEnvelope: { request }
    } = input;

    const { type } = request;

    if (type === REQUEST_TYPES.LAUNCH_REQUEST) return true;

    return fn && fn(input);
  };
}
