import * as posts from "../../api/posts/index.mjs";
import * as display from "../../display/index.mjs";

/**
 * @module handlers/posts
 * @description This module contains all the functions related to search and filter posts.
 * @see module:api/posts
 * @see module:display
 */

/**
 * @function setSearchAndFilterListener
 * @description This function sets the event listeners for the search and filter forms.
 * @memberof module:handlers/posts
 */

export function setSearchAndFilterListener() {
  setSortTypeListener();
  setFilterByTagListener();
  setResetListener();
}

/**
 * @async
 * @function setSortTypeListener
 * @description This function sets the event listener for the sort type form. Uses values from form to send to API. Used the returned posts to display them. asc or desc.
 * @memberof module:handlers/posts
 * @returns {void}
 */

export async function setSortTypeListener() {
  const form = document.querySelector("#sortPostsForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const sortType = values.sortType;

    // send to API
    const returnedPosts = await posts.getPosts("", sortType);
    display.displayPosts(returnedPosts);
  });
}

/**
 * @async
 * @function setFilterByTagListener
 * @description This function sets the event listener for the filter by tag form. Uses values from form to send to API. Used the returned posts to display them.
 * @memberof module:handlers/posts
 * @returns {void}
 */

export async function setFilterByTagListener() {
  const form = document.querySelector("#filterByTagForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const filterTag = values.filterByTag;

    // send to API
    const returnedPosts = await posts.getPosts(filterTag, "");
    display.displayPosts(returnedPosts);
  });
}

/**
 * @async
 * @function setResetListener
 * @description This function sets the event listener for the reset button. Uses values from form to send to API. Fetches all posts without filter or sort and uses the returned posts to display them.
 * @memberof module:handlers/posts
 * @returns {void}
 */

export function setResetListener() {
  const resetButton = document.querySelector("#resetButton");

  if (!resetButton) {
    return;
  }

  resetButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const returnedPosts = await posts.getPosts();
    display.displayPosts(returnedPosts);
  });
}
