import * as listings from "../../api/listings/index.mjs";

/**
 * @module handlers/listings/create
 * @description This module contains all the functions related to creating listings. Used values from the createListing form and sends them to the API.
 * @see module:api/listings/create
 */

export function setCreateListingListener() {
  const form = document.querySelector("#createListingForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const listing = Object.fromEntries(formData.entries());
    console.log(listing);

    // set up tags array
    listing.tags = listing.tags.split(",").map((tag) => tag.trim());

    listing.media = listing.media.split(",").map((media) => media.trim());

    // send to API
    const returnedListing = await listings.createListing(listing);
    console.log(returnedListing);

    // redirect to listing page
    if (!!returnedListing) {
      window.location.href = `/listing/?id=${returnedListing.id}`;
    }
  });
}
