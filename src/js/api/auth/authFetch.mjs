import * as storage from "../../storage/index.mjs";

/**
 * @returns {Object} headers
 * @description Returns the headers object with the Authorization header set.
 */

export function headers() {
  const token = storage.getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

/**
 * @async
 * @module api/authFetch
 * @description This function sends a fetch request to the API with the access token.
 * @param {string} url - API url.
 * @param {object} options - Fetch options.
 * @returns {object} The response object.
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const response = await authFetch(url, {
 * method,
 * body,
 * });
 * return await response.json();
 */

export async function authFetch(url, options) {
  return fetch(url, {
    ...options,
    headers: headers(),
  });
}
