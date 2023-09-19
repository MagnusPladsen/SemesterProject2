import * as listings from "../../api/listings/index.mjs";
import * as display from "../../display/listings/listing.mjs";
import * as storage from "../../storage/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @module handlers/listings/create
 * @description This module contains all the functions related to creating listings. Used values from the createListing form and sends them to the API.
 * @see module:api/listings/create
 */

export async function setBidOnListingListener() {
  const bidButton = document.querySelector("#bidButton");
  const profileCredits = document.querySelector("#profileCredits");
  const bidAmountField = document.querySelector("#bidAmount");

  const oldCredits = storage.getCredits();
  profileCredits.innerHTML = oldCredits;

  const listingId = URL.getParams("id");

  if (!bidButton || !profileCredits || !bidAmountField || !listingId) {
    return;
  }

  bidButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const bidAmount = bidAmountField.value;

    if (bidAmount > 0 && bidAmount < oldCredits) {
      // send to API
      const updatedListing = await listings.bidOnListing(listingId, bidAmount);
      console.log(updatedListing);
      display.displayListing();

      const newCredits = oldCredits - bidAmount;
      storage.updateCredits(newCredits);

      profileCredits.innerHTML = newCredits;
    }
  });
}
