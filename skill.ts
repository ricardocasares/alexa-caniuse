import Alexa from "ask-sdk-core";
import Error from "./handlers/Error";
import Launch from "./handlers/Launch";
import CanIUse from "./handlers/CanIUse";

export const handler = async event =>
  Alexa.SkillBuilders.custom()
    .addRequestHandlers(Launch, CanIUse)
    .addErrorHandlers(Error)
    .lambda();
