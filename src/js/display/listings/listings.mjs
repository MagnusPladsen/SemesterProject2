import * as listings from "../../api/listings/index.mjs";

/**
 * @module display/listings
 * @description This module contains all the functions related to displaying listings on the /listings/ page.
 * @param {Array} listingsList - The list of listings to display.
 * if no listingsList is provided, the function will fetch the listings from the API.
 * @returns {void}
 * @example
 * const listingsList = await listings.getlistings();
 * displaylistings(listingsList);
 */

export async function displaylistings(listingsArray) {
  const listingsContainer = document.querySelector("#listingsContainer");

  if (!listingsArray) {
    listingsArray = await listings.getlistings();
  }
  if (!listingsArray || !listingsContainer) {
    return;
  }

  if (listingsArray.length < 1) {
    listingsContainer.innerHTML = `
    <div class="w-full mx-auto">No listings found matching your criteria.</div>
    `;
    return;
  }

  listingsContainer.innerHTML = "";
  listingsArray.map((listing) => {
    listingsContainer.innerHTML += `
    <a href="/listing/?id=${listing.id}" class="w-full mx-auto">
        <div class="group hover:cursor-pointer hover:border-primary hover:shadow-lg hover:scale-105 bg-gray-100 border border-gray-300 rounded shadow p-4 flex flex-col gap-4 transition-all w-full md:max-w-[400px] md:mx-auto justify-between">
          <p class="text-lg font-bold transition-all group-hover:text-primary">${
            listing.title
          }</p>
          <p class="text-left pb-4">${listing.description}</p>
          <div class="flex items-start justify-between w-full gap-5 text-xs font-bold text-gray-400">
          <div class="flex flex-col gap-1 items-start">
          ${
            listing.bids.length > 0
              ? `<p class="">Price: ${
                  listing.bids[listing.bids.length - 1].amount
                }
          </p>`
              : ""
          }
            <p class="">Ending: ${listing.endsAt.slice(0, 10)}
            </p>
</div>
              <p>By:
                <span class="font-bold group-hover:text-black">${
                  listing.seller.name
                }</span>
              </p>
          </div>
        </div>
        </a>`;
  });
}
