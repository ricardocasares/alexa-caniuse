import { createBrowsers, createFeatures } from "./lib/helpers";

export const model = {
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
      dialog: {
        intents: [
          {
            name: "CanIUse",
            confirmationRequired: false,
            prompts: {},
            slots: [
              {
                name: "feature",
                type: "Features",
                confirmationRequired: false,
                elicitationRequired: true,
                prompts: {
                  elicitation: "Elicit.Slot.432100908134.312193826766"
                }
              },
              {
                name: "browser",
                type: "Browsers",
                confirmationRequired: false,
                elicitationRequired: false,
                prompts: {}
              },
              {
                name: "version",
                type: "AMAZON.NUMBER",
                confirmationRequired: false,
                elicitationRequired: false,
                prompts: {}
              }
            ]
          }
        ]
      },
      prompts: [
        {
          id: "Elicit.Slot.432100908134.312193826766",
          variations: [
            {
              type: "PlainText",
              value: "what feature would you like to check?"
            }
          ]
        }
      ],
      types: [createFeatures(), createBrowsers()]
    }
  }
};

export default model;

console.log(JSON.stringify(model, null, 2));
