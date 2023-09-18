import * as listing from "../handlers/listings/index.mjs";
import * as profile from "../handlers/profile/index.mjs";
import * as display from "../display/index.mjs";
import * as storage from "../storage/index.mjs";
import * as URL from "../url/index.mjs";
import * as navigation from "../handlers/navigation/index.mjs";

/**
 * @description This is the entry point of the application.
 * @returns {void}
 * Uses the path to determine which functions to call.
 */

export default function router() {
  navigation.setLoggedInChecker();
  navigation.setLoggedInNavBarListener();
  navigation.setNavDropDownListener();
  const path = URL.getPath();
  switch (path) {
    case "/":
      if (storage.checkIfLoggedIn()) {
        window.location.href = "/listings/";
      }
      profile.setLoginFormListener();
      break;
    case "/index.html":
      if (storage.checkIfLoggedIn()) {
        window.location.href = "/listings/";
      }
      profile.setLoginFormListener();
      break;
    case "/profile/":
      display.displayProfile(storage.getProfile().name);
      profile.setLogOutListener();
      break;
    case "/profile/user/":
      display.displayProfile(URL.getParams("name"));
      profile.setFollowUserListener();
      break;
    case "/profile/register/":
      profile.setRegisterFormListener();
      break;
    case "/profile/edit/":
      profile.setEditFormListener();
      break;
    case "/profile/listing/":
      display.displayListing();
      break;
    case "/listing/":
      display.displayListing();
      break;
    case "/listing/new/":
      listing.setCreateListingListener();
      break;
    case "/listing/edit/":
      listing.setUpdateListingListener();
      break;
    case "/listings/":
      display.displaylistings();
      listing.setSearchAndFilterListener();
      break;
    default:
      break;
  }
}
