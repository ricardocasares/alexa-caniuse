import * as api from "caniuse-api";
import { BROWSERS, RESOLUTION_STATUS } from "./constants";

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

  return { value: value.id, name: value.name };
}

export function featureResolver(feature) {
  let { name, value, resolutions } = feature;

  if (!resolutions) return { name, value };

  const { resolutionsPerAuthority } = resolutions;
  const [
    {
      values,
      status: { code }
    }
  ] = resolutionsPerAuthority;

  if (code === RESOLUTION_STATUS.MATCH) {
    const [{ value }] = values;
    return { name: value.name, id: value.id };
  }

  return { name: value, id: featureMatch(value) };
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
