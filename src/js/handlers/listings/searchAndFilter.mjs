import * as listings from "../../api/listings/index.mjs";
import * as display from "../../display/index.mjs";

/**
 * @module handlers/listings
 * @description This module contains all the functions related to search and filter listings.
 * @see module:api/listings
 * @see module:display
 */

/**
 * @function setSearchAndFilterListener
 * @description This function sets the event listeners for the search and filter forms.
 * @memberof module:handlers/listings
 */

export function setSearchAndFilterListener() {
  setSortTypeListener();
  setFilterByTagListener();
  setResetListener();
}

/**
 * @async
 * @function setSortTypeListener
 * @description This function sets the event listener for the sort type form. Uses values from form to send to API. Used the returned listings to display them. asc or desc.
 * @memberof module:handlers/listings
 * @returns {void}
 */

export async function setSortTypeListener() {
  const form = document.querySelector("#sortlistingsForm");

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
    const returnedlistings = await listings.getlistings("", sortType);
    display.displaylistings(returnedlistings);
  });
}

/**
 * @async
 * @function setFilterByTagListener
 * @description This function sets the event listener for the filter by tag form. Uses values from form to send to API. Used the returned listings to display them.
 * @memberof module:handlers/listings
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
    const returnedlistings = await listings.getlistings(filterTag, "");
    display.displaylistings(returnedlistings);
  });
}

/**
 * @async
 * @function setResetListener
 * @description This function sets the event listener for the reset button. Uses values from form to send to API. Fetches all listings without filter or sort and uses the returned listings to display them.
 * @memberof module:handlers/listings
 * @returns {void}
 */

export function setResetListener() {
  const resetButton = document.querySelector("#resetButton");

  if (!resetButton) {
    return;
  }

  resetButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const returnedlistings = await listings.getlistings();
    display.displaylistings(returnedlistings);
  });
}
