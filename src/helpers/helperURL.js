// helpers/helperURL.js
/**
 * Crea el query string ignorando valores vacíos (null/undefined/"").
 */
export const buildQuery = (filters = {}, allowed = []) => {
  const qs = new URLSearchParams();
  const keys = allowed.length ? allowed : Object.keys(filters);

  for (const k of keys) {
    const v = filters[k];
    if (v !== undefined && v !== null) {
      const s = String(v).trim();
      if (s !== "") qs.set(k, s);
    }
  }
  const s = qs.toString();
  return s ? `?${s}` : "";
};

/**
 * Devuelve basePath + query ya montado.
 */
export const buildURL = (basePath, filters = {}, allowed = []) =>
  `${basePath}${buildQuery(filters, allowed)}`;
