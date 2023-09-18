import * as listings from "../../api/listings/index.mjs";
import * as URL from "../../url/index.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * @module display/listing
 * @description This function displays all the listings. Gets the id from the URL params, and uses it to get the listing from the API and display them.
 * @returns {void}
 */

export async function displayListing() {
  const listingId = URL.getParams("id");
  const path = URL.getPath();
  const listing = await listings.getListing(listingId);
  const loggedInUser = storage.getProfile();

  // comments
  // reactions
  if (!listing) {
    return;
  }

  if (path === "/profile/listing/") {
    const deleteListing = document.querySelector("#deleteListing");
    console.log(deleteListing);
    deleteListing.addEventListener("click", async (e) => {
      e.preventDefault();
      await listings.deleteListing(listing.id);
      window.location.href = "/listings/";
    });
  }

  const listingTitle = document.querySelector("#listingTitle");
  const listingContent = document.querySelector("#listingContent");
  const listingDate = document.querySelector("#listingDate");
  const listingSeller = document.querySelector("#listingSeller");
  const listingMedia = document.querySelector("#listingMedia");
  const listingTags = document.querySelector("#listingTags");
  const listingBids = document.querySelector("#listingBids");
  listingTitle.innerHTML = listing.title;
  listingContent.innerHTML = listing.description;
  listingDate.innerHTML = `Ending: <span class="font-bold">${listing.created.slice(
    0,
    10
  )}</span>`;
  listingSeller.innerHTML = `By: <a href="
  ${
    loggedInUser.name === listing.seller.name
      ? "/profile/"
      : `/profile/user/?name=${listing.seller.name}`
  }" class="font-bold hover:text-primary hover:underline underline-offset-2"><div class="flex items-center gap-1"><p>${
    listing.seller.name
  }</p><img
  id="profilePicture"
  src="${
    listing.seller.avatar
      ? listing.seller.avatar
      : "/src/images/ProfilePlaceHolder.svg"
  }"
  alt="Profile picture"
  height="15"
  width="25"
  class="rounded-full transition-all"
  /></div></a>`;
  if (listing.media.length > 0) {
    listingMedia.innerHTML = "";
    listing.media.map((media) => {
      listingMedia.innerHTML += `
    <img
    src="${media}"
    alt="Listing media"
    class="w-full object-cover h-auto rounded" /> `;
    });
  }
  if (listing.tags) {
    listingTags.innerHTML = `
      Tags: ${listing.tags.map(
        (tag) => `<span class="ml-1 font-bold text-black">${tag}</span>`
      )}
    `;
  }
  if (listing._count) {
    listingBids.innerHTML = `
      Bids: <span class="font-bold">${listing._count.bids}</span
    `;
  }
}
