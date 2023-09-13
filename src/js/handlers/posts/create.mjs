import * as posts from "../../api/posts/index.mjs";

/**
 * @module handlers/posts/create
 * @description This module contains all the functions related to creating posts. Used values from the createPost form and sends them to the API.
 * @see module:api/posts/create
 */

export function setCreatePostListener() {
  const form = document.querySelector("#createPostForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());
    // set up tags array
    post.tags = post.tags.split(",").map((tag) => tag.trim());

    // send to API
    const returnedPost = await posts.createPost(post);

    // redirect to post page
    window.location.href = `/post/?id=${returnedPost.id}`;
  });
}
