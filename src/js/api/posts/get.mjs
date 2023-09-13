import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "GET";

/**
 * @param {string} id
 * @returns postObject from API
 * @throws {Error} if id is missing
 */

export async function getPost(id) {
  if (!id) throw new Error("Missing post id");

  const url = `${API_URL}${action}/${id}?_author=true`;

  const response = await authFetch(url, {
    method,
  });

  return await response.json();
}

/**
 * @async
 * @module api/posts/get
 * @description This function sends a DELETE request to the API to delete a post. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {string} tag - For filtering posts by tag (optional)
 * @param {string} sortType - For sorting posts by date (optional)
 * if no params are passed, all posts are returned
 * @returns {array} An array with the post
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * getPost(420);
 */

export async function getPosts(tag, sortType) {
  const url = `${API_URL}${action}?_author=true${tag ? `&_tag=${tag}` : ""}${
    sortType ? `&sort=created&sortOrder=${sortType}` : ""
  }`;

  const response = await authFetch(url, {
    method,
  });

  return await response.json();
}
