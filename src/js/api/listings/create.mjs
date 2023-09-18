import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/listings";
const method = "POST";

/**
 * @async
 * @module api/listings/create
 * @description This function sends a POST request to the API to create a listing. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {object} listing - Listing data from the create listing form.
 * @returns {void}
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const listingData = {
 *  title: "title",
 *  description: "description",
 * endsAt: "2021-12-31T23:59:59.999Z",
 *  media: "url",
 *  tags: ["tag1", "tag2"],
 * };
 * createListing(listingData);
 *
 */

export async function createListing(listing) {
  const url = `${API_URL}${action}`;
  const body = JSON.stringify(listing);

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
