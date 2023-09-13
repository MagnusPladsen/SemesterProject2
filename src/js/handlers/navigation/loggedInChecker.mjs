import * as storage from "../../storage/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @module handlers/navigation/loggedInChecker
 * @description This module checks if the user is logged in with the help of the storage module. If the user is not logged in and is not on the login or register paths, it redirects to the login page.
 * @see module:storage
 * @see module:url
 * @returns {void}
 */

export function setLoggedInChecker() {
  const path = URL.getPath();
  // redirect to login if not logged in
  if (
    !storage.checkIfLoggedIn() &&
    path !== "/" &&
    path !== "/index.html" &&
    path !== "/profile/register/"
  ) {
    window.location.href = "/";
  }
}
