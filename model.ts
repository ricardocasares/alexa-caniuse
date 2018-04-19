import { createBrowsers, createFeatures } from "./lib/helpers";

export default {
  interactionModel: {
    languageModel: {
      invocationName: "can i use",
      intents: [
        {
          name: "AMAZON.CancelIntent",
          samples: []
        },
        {
          name: "AMAZON.HelpIntent",
          samples: []
        },
        {
          name: "AMAZON.StopIntent",
          samples: []
        },
        {
          name: "CanIUse",
          slots: [
            {
              name: "feature",
              type: "Features"
            },
            {
              name: "browser",
              type: "Browsers"
            }
          ],
          samples: [
            "for {feature}",
            "if I can use {feature}",
            "can i use {feature}",
            "is {feature} supported in {browser}",
            "{feature} in {browser}"
          ]
        }
      ],
      types: [createFeatures(), createBrowsers()]
    }
  }
};
