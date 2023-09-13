import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/profiles";
const method = "GET";

/**
 * @async
 * @module api/profiles/get
 * @description This function sends a GET request to the API to get a profile. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} name - Profile name.
 * @returns {object} The profile object.
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * getProfile("username");
 */

export async function getProfile(name) {
  if (!name) throw new Error("Missing profile name");

  const url = `${API_URL}${action}/${name}?_posts=true&_following=true&_followers=true`;

  const response = await authFetch(url, {
    method,
  });

  return await response.json();
}
