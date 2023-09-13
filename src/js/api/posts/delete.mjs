import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "DELETE";

/**
 * @async
 * @module api/posts/delete
 * @description This function sends a DELETE request to the API to delete a post. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} id - Post id.
 * @returns {void}
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * createPost(420);
 */

export async function deletePost(id) {
  if (!id) throw new Error("Missing post id");

  const url = `${API_URL}${action}/${id}}`;

  const response = await authFetch(url, {
    method,
  });

  return await response.json();
}
