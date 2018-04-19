import * as Alexa from "ask-sdk-core";
import { IntentRequest } from "ask-sdk-model";
import { REQUEST_TYPES } from "./constants";

export const launch = check(isType(REQUEST_TYPES.LAUNCH_REQUEST));

export const intents = (...names) =>
  check(isType(REQUEST_TYPES.INTENT_REQUEST), isIntent(...names));

export const sessionEnded = check(isType(REQUEST_TYPES.SESSION_ENDED_REQUEST));

export function check(...fns) {
  return async (input: Alexa.HandlerInput): Promise<boolean> => {
    let idx = 0;
    let next: boolean | Promise<boolean>;
    let fn: (input: Alexa.HandlerInput) => boolean | Promise<boolean>;

    do {
      fn = fns[idx];
      next = await fn(input);
      idx++;
    } while (next && idx < fns.length);

    return next;
  };
}

export function isType(type: string) {
  return (input: Alexa.HandlerInput): boolean =>
    input.requestEnvelope.request.type === type;
}

export function isIntent(...names: string[]) {
  return (input: Alexa.HandlerInput): boolean =>
    names.includes(
      (input.requestEnvelope.request as IntentRequest).intent.name
    );
}
