import * as storage from "../../storage/index.mjs";
import * as display from "../../display/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @module handlers/navigation/loggedInNavBar
 * @description This module displays the navigation bar for logged in users. It uses the storage module to get the profile information.
 * @see module:storage
 * @see module:display
 * @see module:url
 * @returns {void}
 */

export function setLoggedInNavBarListener() {
  const path = URL.getPath();
  const navList = document.querySelector("#navList");
  if (!navList) {
    return;
  }
  if (storage.checkIfLoggedIn()) {
    const profile = storage.getProfile();
    display.displayLoggedInNavBar(navList, profile, path);
  }
}
