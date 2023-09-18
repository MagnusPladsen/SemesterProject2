import * as profile from "../api/profile/index.mjs";
import * as display from "../display/index.mjs";
import * as listings from "../api/listings/index.mjs";

const browserTitle = document.querySelector("title");
const profileTitle = document.querySelector("#profileTitle");
const profilePicture = document.querySelector("#profilePicture");
const profileCredits = document.querySelector("#profileCredits");
const profileWins = document.querySelector("#profileWins");
const profileListings = document.querySelector("#profileListings");
const listingsContainer = document.querySelector("#listingsContainer");
const listingWinsContainer = document.querySelector("#listingWinsContainer");
const showListingsButton = document.querySelector("#showListingsButton");
const showListingWinsButton = document.querySelector("#showListingWinsButton");

/**
 * @module display/profile
 * @description This function displays the profile page of a user.
 * @param {string} name - Name of the user.
 * @returns {void}
 * @example
 * displayProfile("name");
 */

export async function displayProfile(name) {
  const user = await profile.getProfile(name);
  console.log(user);
  const buttonStyles = {
    active: [
      "px-4",
      "py-2",
      "border",
      "bg-primary",
      "hover:text-primary",
      "border-primary",
      "hover:bg-white",
      "rounded",
      "w-fit",
      "mx-auto",
      "text-white",
      "transition-all",
      "hover:scale-110",
    ],
    nonActive: [
      "px-4",
      "py-2",
      "border",
      "hover:bg-primary",
      "bg-white",
      "hover:text-white",
      "text-primary",
      "border-primary",
      "rounded",
      "w-fit",
      "mx-auto",
      "transition-all",
      "hover:scale-110",
    ],
  };
  browserTitle.textContent = "NorAuc - " + user.name;
  profileTitle.textContent = user.name;
  profileCredits.textContent = user.credits;
  profileWins.textContent = user.wins.length;
  profileListings.textContent = user._count.listings;
  if (user.avatar) {
    profilePicture.src = user.avatar;
  }
  if (user.listings.length > 0) {
    // display listings from newest to oldest
    display.displayProfileListings(user.listings.reverse(), listingsContainer);
  }
  if (user.wins.length > 0) {
    // display wins from newest to oldest
    user.wins.map(async (listingId, index) => {
      const listing = await listings.getListing(listingId);
      user.wins[index] = listing;
    });
    display.displayProfileListings(user.wins.reverse(), listingWinsContainer);
  }
  if (showListingsButton && showListingWinsButton) {
    showListingsButton.addEventListener("click", (e) => {
      e.preventDefault();
      listingsContainer.classList.remove("hidden");
      listingsContainer.classList.add("flex");
      listingWinsContainer.classList.remove("flex");
      listingWinsContainer.classList.add("hidden");
      /*  showListingsButton.classList.remove(buttonStyles.nonActive);
      showListingsButton.classList.add(buttonStyles.active);
      showListingWinsButton.classList.remove(buttonStyles.active);
      showListingWinsButton.classList.add(buttonStyles.nonActive); */
    });
    showListingWinsButton.addEventListener("click", (e) => {
      e.preventDefault();
      listingsContainer.classList.add("hidden");
      listingsContainer.classList.remove("flex");
      listingWinsContainer.classList.remove("hidden");
      listingWinsContainer.classList.add("flex");
      /* showListingWinsButton.classList.remove(buttonStyles.nonActive);
      showListingWinsButton.classList.add(buttonStyles.active);
      showListingsButton.classList.remove(buttonStyles.active);
      showListingsButton.classList.add(buttonStyles.nonActive); */
    });
  }
}
