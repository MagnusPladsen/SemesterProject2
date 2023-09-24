import * as listings from "../../api/listings/index.mjs";
import * as display from "../../display/listings/listing.mjs";
import * as storage from "../../storage/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @module handlers/listings/create
 * @description This module contains all the functions related to creating listings. Used values from the createListing form and sends them to the API.
 * @see module:api/listings/create
 */

export async function setBidOnListingListener(highestBid) {
  const bidButton = document.querySelector("#bidButton");
  const profileCredits = document.querySelector("#profileCredits");
  const bidAmountField = document.querySelector("#bidAmount");
  const bidError = document.querySelector("#bidError");

  const oldCredits = storage.getCredits();
  profileCredits.innerHTML = oldCredits;

  const listingId = URL.getParams("id");

  if (!bidButton || !profileCredits || !bidAmountField || !listingId) {
    return;
  }

  bidButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const bidAmount = bidAmountField.value;

    if (bidAmount > 0 && bidAmount > highestBid && bidAmount < oldCredits) {
      // send to API
      bidError.classList.add("hidden");
      bidAmountField.classList.remove("border-red-500");
      const updatedListing = await listings.bidOnListing(listingId, bidAmount);
      display.displayListing();
      const newCredits = oldCredits - bidAmount;
      storage.updateCredits(newCredits);
      profileCredits.innerHTML = newCredits;
    } else if (bidAmount < highestBid) {
      bidAmountField.classList.add("border-red-500");
      bidAmountField.value = "";
      bidAmountField.placeholder = `Bid between ${highestBid} and ${oldCredits}`;
      bidError.innerHTML = `Bid is lower than highest bid, which is ${highestBid}`;
      bidError.classList.remove("hidden");
    } else if (bidAmount > oldCredits) {
      bidAmountField.classList.add("border-red-500");
      bidAmountField.value = "";
      bidAmountField.placeholder = `Bid between ${highestBid} and ${oldCredits}`;
      bidError.innerHTML = `Bid is higher than your credits, which is ${oldCredits}`;
      bidError.classList.remove("hidden");
    }
  });
}
