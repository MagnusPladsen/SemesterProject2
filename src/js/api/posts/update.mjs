import { API_URL } from "../constants.mjs";
import { authFetch } from "../auth/authFetch.mjs";

const action = "/posts";
const method = "PUT";

/**
 * @async
 * @module api/posts/update
 * @description This function sends a PUT request to the API to update a post. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {object} post - Post data from the create post form.
 * @returns {object} The updated post object.
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const post = {
 *  id: "id",
 *  title: "title",
 *  body: "body",
 *  media: "url",
 *  tags: ["tag1", "tag2"],
 * };
 * updatePost(post);
 */

export async function updatePost(post) {
  if (!post.id) throw new Error("Missing post id");

  const url = `${API_URL}${action}/${post.id}}`;
  const body = JSON.stringify(post);

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
