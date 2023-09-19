import * as listings from "../../api/listings/index.mjs";
import * as URL from "../../url/index.mjs";
import * as storage from "../../storage/index.mjs";
import { setBidOnListingListener } from "../../handlers/listings/bid.mjs";

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
  console.log(listing);

  /* If on own listing */
  if (path === "/profile/listing/") {
    const deleteListing = document.querySelector("#deleteListing");
    deleteListing.addEventListener("click", async (e) => {
      e.preventDefault();
      await listings.deleteListing(listing.id);
      window.location.href = "/listings/";
    });
    const editListing = document.querySelector("#editListing");
    editListing.addEventListener("click", async (e) => {
      e.preventDefault();
      window.location.href = `/listing/edit/?id=${listing.id}`;
    });
  }

  /* If on others listing */
  if (path === "/listing/") {
    const bidContainer = document.querySelector("#bidContainer");
    if (new Date(listing.endsAt) < new Date()) {
      bidContainer.innerHTML = `<p class="text-center">This listing has ended</p>`;
    }
    setBidOnListingListener();
  }

  const listingTitle = document.querySelector("#listingTitle");
  const listingContent = document.querySelector("#listingContent");
  const listingDate = document.querySelector("#listingDate");
  const listingSeller = document.querySelector("#listingSeller");
  const listingMedia = document.querySelector("#listingMedia");
  const listingTags = document.querySelector("#listingTags");
  const listingBids = document.querySelector("#listingBids");
  const bidsContainer = document.querySelector("#bidsContainer");
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
  if (listing.bids.length > 0) {
    bidsContainer.innerHTML = `
    <div class="flex flex-col pt-10  ">
      <h2 class="text-xl pb-5 font-bold underline ">Bids</h2>
      ${listing.bids.map(
        (bid) => `
        <div class="flex flex-col gap-1 border py-2 px-4 bg-background rounded w-fit mx-auto text-left border-primary"><p>Amount: <span class="font-bold">${
          bid.amount
        }</span></p>
        <p>Ending: <span class="font-bold">${bid.created.slice(
          0,
          10
        )}</span></p>
        <p class="">Bidder:
       <a class="hover:font-bold" href="/profile/user?name=${bid.bidderName}">${
          bid.bidderName === loggedInUser.name ? `You` : bid.bidderName
        }</a>
        </div>`
      )}
    </div>
    `;
  }
}
