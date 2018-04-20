import { createBrowsers, createFeatures } from "./lib/helpers";

export default {
  interactionModel: {
    languageModel: {
      invocationName: "kenny",
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
              type: "Features",
              samples: ["{feature}"]
            },
            {
              name: "browser",
              type: "Browsers"
            },
            {
              name: "version",
              type: "AMAZON.NUMBER"
            }
          ],
          samples: [
            "can i use {feature}",
            "can i use {feature} in {browser} {version}",
            "can i use {feature} in {browser} version {version}",
            "can i use {feature} on {browser}",
            "can i use {feature} in {browser}",
            "can i use {feature} on {browser} version {version}",
            "can i use {feature} on {browser} {version}"
          ]
        }
      ],
      types: [createFeatures(), createBrowsers()]
    }
  }
};
