import * as api from "caniuse-api";
import { BROWSERS } from "./constants";

export function toSlotID(slot) {
  // THIS IS INSECURE @TODO: MAKE CHECKS FOR MISSING STUFF AND FAILOVERS
  const { name, resolutions } = slot;
  const { resolutionsPerAuthority } = resolutions;
  const [resolution] = resolutionsPerAuthority;
  const {
    values,
    status: { code }
  } = resolution;
  const [{ value }] = values;

  return { id: value.id, name: value.name };
}

export function humanReadable(support) {
  return Object.keys(support)
    .map(browser => {
      const vers = support[browser];
      if (!vers.y) return `<p>${BROWSERS[browser]} is not supported.</p>`;
      return `<p>${BROWSERS[browser]} since version ${vers.y}</p>`;
    })
    .join("\n");
}

export function createFeatures() {
  return {
    name: "Features",
    values: api.features.map(feature => ({
      id: feature,
      name: {
        value: feature.replace(/-/g, " ")
      }
    }))
  };
}

export function createBrowsers() {
  return {
    name: "Browsers",
    values: api.getBrowserScope().map(browser => ({
      id: browser,
      name: {
        value: BROWSERS[browser]
      }
    }))
  };
}
