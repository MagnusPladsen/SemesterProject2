import * as storage from "../../storage/index.mjs";

/**
 * @module handlers/profile/logout
 * @description This module contains the function that logs out the user. It is called from the profile page. It uses the storage module to log out the user. Redirects to the home page.
 * @see module:storage
 * @returns {void}
 */

export function setLogOutListener() {
  const logOutButton = document.querySelector("#logOutButton");
  if (!!logOutButton & storage.checkIfLoggedIn()) {
    logOutButton.addEventListener("click", () => {
      storage.logOut();
      console.log("logged out");
      console.log(storage.getProfile());
      window.location.href = "/";
    });
  }
}
