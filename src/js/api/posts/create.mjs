import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "POST";

/**
 * @async
 * @module api/posts/create
 * @description This function sends a POST request to the API to create a post. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {object} post - Post data from the create post form.
 * @returns {void}
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const postData = {
 *  title: "title",
 *  body: "body",
 *  media: "url",
 *  tags: ["tag1", "tag2"],
 * };
 * createPost(postData);
 *
 */

export async function createPost(post) {
  const url = `${API_URL}${action}`;
  const body = JSON.stringify(post);

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
