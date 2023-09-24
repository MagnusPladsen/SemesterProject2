import { API_URL } from "../constants.mjs";
import { authFetch, unAuthFetch } from "../auth/authFetch.mjs";

const action = "/listings";
const method = "GET";

/**
 * @param {string} id
 * @returns listingObject from API
 * @throws {Error} if id is missing
 */

export async function getListing(id) {
  if (!id) throw new Error("Missing listing id");

  const url = `${API_URL}${action}/${id}?_seller=true&_bids=true`;

  const response = await authFetch(url, {
    method,
  });

  return await response.json();
}

/**
 * @async
 * @module api/listings/get
 * @description This function sends a DELETE request to the API to delete a listing. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} tag - For filtering listings by tag (optional)
 * @param {string} sortType - For sorting listings by date (optional)
 * if no params are passed, all listings are returned
 * @returns {array} An array with the listing
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * getListing(420);
 */

export async function getlistings(tag, sortType) {
  const url = `${API_URL}${action}?_seller=true&_bids=true${tag ? `&_tag=${tag}` : ""}${
    sortType ? `&sort=created&sortOrder=${sortType}` : ""
  }`;

  const response = await unAuthFetch(url, {
    method,
  });

  return await response.json();
}
