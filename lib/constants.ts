import * as api from "caniuse-api";

export const REQUEST_TYPES = {
  LAUNCH_REQUEST: "LaunchRequest",
  INTENT_REQUEST: "IntentRequest",
  SESSION_ENDED_REQUEST: "SessionEndedRequest"
};

export const RESOLUTION_STATUS = {
  MATCH: "ER_SUCCESS_MATCH",
  NO_MATCH: "ER_SUCCESS_NO_MATCH"
};

export const BROWSERS = {
  and_chr: "Chrome for Android",
  and_ff: "Firefox for Android",
  and_qq: "QQ Browser for Android",
  and_uc: "UC Browser for Android",
  android: "Android",
  baidu: "Baidu",
  bb: "BlackBerry Browser",
  blackberry: "BlackBerry",
  chrome: "Google Chrome",
  edge: "Microsoft Edge",
  firefox: "Mozilla Firefox",
  ie_mob: "Internet Explorer Mobile",
  ie: "Internet Explorer",
  ios_saf: "iOS Safari",
  op_mini: "Opera Mini",
  op_mob: "Opera Mobile",
  opera: "Opera",
  safari: "Safari",
  samsung: "Samsung Internet"
};
