import * as Alexa from "ask-sdk-core";
import * as Handlers from "./handlers";

export const handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(Handlers.LaunchHandler, Handlers.CanIUseHandler)
  .addErrorHandlers(Handlers.ErrorHandler)
  .lambda();
