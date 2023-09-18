import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/listings";
const method = "DELETE";

/**
 * @async
 * @module api/listings/delete
 * @description This function sends a DELETE request to the API to delete a listing. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} id - Listing id.
 * @returns {void}
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * createListing(420);
 */

export async function deleteListing(id) {
  if (!id) throw new Error("Missing listing id");

  const url = `${API_URL}${action}/${id}`;
  
  const response = await authFetch(url, {
    method,
  });

  return await response.json();
}
