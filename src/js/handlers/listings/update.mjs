import * as listings from "../../api/listings/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @async
 * @module handlers/listings/update
 * @description This module contains all the functions related to updating listings. Takes the listing ID from the URL params and prefills the form with the existing values. Then uses the updated form data and sends it to the API.
 * @see module:api/listings
 * @see module:url
 */

export async function setUpdateListingListener() {
  const form = document.querySelector("#editListingForm");
  const id = URL.getParams("id");
  const listing = await listings.getListing(id);

  if (!form) {
    return;
  }

  form.title.value = listing.title;
  form.description.value = listing.description;
  /* form.endsAt.value = listing.endsAt.slice(0, 10); */

  // prefill form
  if (listing.media) {
    form.media.value = listing.media.join(", ");
  }

  if (listing.tags) {
    form.tags.value = listing.tags.join(", ");
  }

  // enable button
  form.editListingButton.disabled = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const listing = Object.fromEntries(formData.entries());
    // set up tags array
    listing.tags = listing.tags.split(",").map((tag) => tag.trim());
    listing.media = listing.media.split(",").map((media) => media.trim());
    listing.id = id;

    // send to API
    const returnedListing = await listings.updateListing(listing);

    // redirect to listing page
    window.location.href = `/profile/listing/?id=${returnedListing.id}`;
  });
}
