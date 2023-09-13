import * as posts from "../../api/posts/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @async
 * @module handlers/posts/update
 * @description This module contains all the functions related to updating posts. Takes the post ID from the URL params and prefills the form with the existing values. Then uses the updated form data and sends it to the API.
 * @see module:api/posts
 * @see module:url
 */

export async function setUpdatePostListener() {
  const form = document.querySelector("#editPostForm");
  const id = URL.getParams("id");
  const post = await posts.getPost(id);

  if (!form) {
    return;
  }

  form.title.value = post.title;
  form.body.value = post.body;

  // prefill form
  if (post.media) {
    form.media.value = post.media;
  }

  if (post.tags) {
    form.tags.value = post.tags.join(", ");
  }

  // enable button
  form.editPostButton.disabled = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
    // set up tags array
    post.tags = post.tags.split(",").map((tag) => tag.trim());
    post.id = id;

    // send to API
    const returnedPost = await posts.updatePost(post);

    // redirect to post page
    window.location.href = `/post/?id=${returnedPost.id}`;
  });
}
