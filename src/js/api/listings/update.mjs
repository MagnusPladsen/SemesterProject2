import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/listings";
const method = "PUT";

/**
 * @async
 * @module api/listings/update
 * @description This function sends a PUT request to the API to update a listing. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {object} listing - Listing data from the create listing form.
 * @returns {object} The updated listing object.
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const listing = {
 *  id: "id",
 *  title: "title",
 *  description: "description",
 *  media: "url",
 *  tags: ["tag1", "tag2"],
 * };
 * updateListing(listing);
 */

export async function updateListing(listing) {
  if (!listing.id) throw new Error("Missing listing id");

  const url = `${API_URL}${action}/${listing.id}}`;
  const body = JSON.stringify(listing);

  const error = document.querySelector("#error");

  try {
    const response = await authFetch(url, {
      method,
      body,
    });

    return await response.json();
  } catch (error) {
    error.classList.remove("hidden");
    error.innerHTML = error;
  }
}
