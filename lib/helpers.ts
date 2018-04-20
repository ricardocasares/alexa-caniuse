import * as api from "caniuse-api";
import { BROWSERS, RESOLUTION_STATUS } from "./constants";
import { Slot } from "ask-sdk-model";

interface ResolvedSlot {
  id?: any;
  name: string;
  match: string;
  value: string;
  resolved: boolean;
}

export function resolveSlots(slots): Record<string, ResolvedSlot> {
  return Object.keys(slots).reduce((resolved, key) => {
    const { name, value, resolutions } = slots[key];

    if (!resolutions) {
      return {
        ...resolved,
        [name]: { name, match: value, value, resolved: false }
      };
    }

    const { resolutionsPerAuthority = [] } = resolutions;
    const [
      {
        values,
        status: { code }
      }
    ] = resolutionsPerAuthority;

    if (code === RESOLUTION_STATUS.NO_MATCH) {
      return {
        ...resolved,
        [name]: { name, match: value, value, resolved: false }
      };
    }

    const [{ value: slot }] = values;

    return {
      ...resolved,
      [name]: {
        name,
        id: slot.id,
        value: slot.name,
        match: value,
        resolved: true
      }
    };
  }, {});
}

export function featureResolver(feature): ResolvedSlot {
  let { name, match, value } = feature;

  return { name, match: value, value, id: featureMatch(value), resolved: true };
}

function featureMatch(str) {
  if (!str.length) return str;

  return (
    Array.from(
      str
        .split(" ")
        .map(find)
        .filter(a => a.length)
        .map(a => new Set(a))
        .reduce((a, b, i) => {
          return new Set(Array.from(a).filter(x => b.has(x)));
        })
    ).shift() || str
  );
}

function find(str) {
  const props = api.find(str);
  return Array.isArray(props) ? props : [props];
}

export function humanReadable(support) {
  return Object.keys(support)
    .filter(browser => {
      const vers = support[browser];
      return vers.y;
    })
    .map(browser => {
      const vers = support[browser];
      return `<p>${BROWSERS[browser]}, since version ${vers.y}</p>`;
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
