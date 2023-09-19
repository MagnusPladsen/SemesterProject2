import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/listings";
const method = "POST";

/**
 * @async
 * @module api/listings/bid
 * @description This function sends a POST request to the API to bid on a listing. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} listingId - Listing data from the create listing form.
 * @param {number} bidAmount - Amount of credits to bid on the listing.
 * @returns {object} The updated listing object.
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * updateListing(13, 200);
 */

export async function bidOnListing(listingId, bidAmount) {
  if (!listingId) throw new Error("Missing listing id");
  if (!bidAmount) throw new Error("Missing listing bid amount");

  const url = `${API_URL}${action}/${listingId}/bids`;
  const body = JSON.stringify({ amount: Number(bidAmount) });

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
