import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/profiles";
const method = "PUT";

/**
 * @async
 * @module api/profiles/follow
 * @description This function sends a PUT request to the API to follow a user. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} name - Profile name.
 * @param {string} followType - Follow type. Either "follow" or "unfollow".
 * @returns {object} The updated profile object.
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * followUser("username", "follow");
 * followUser("username", "unfollow");
 */

export async function followUser(name, followType) {
  if (!name) throw new Error("Missing profile name");

  const url = `${API_URL}${action}/${name}/${followType}`;

  const response = await authFetch(url, {
    method,
    body: JSON.stringify({}),
  });

  return await response.json();
}
