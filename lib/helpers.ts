export function toSlotID(slot) {
  // THIS IS INSECURE @TODO: MAKE CHECKS FOR MISSING STUFF AND FAILOVERS
  const { name, resolutions } = slot;
  const { resolutionsPerAuthority } = resolutions;
  const [resolution] = resolutionsPerAuthority;
  const {
    values,
    status: { code }
  } = resolution;
  const [first] = values;

  return { name, id: first.id };
}

export function humanReadable(support) {
  return Object.keys(support)
    .map(browser => {
      const vers = support[browser];
      if (!vers.y) return `${browser} is not supported.`;
      return `${browser} since version ${vers.y}`;
    })
    .join("\n");
}
