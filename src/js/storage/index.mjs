/**
 * @module storage
 * @see module:storage/saveProfile
 * @see module:storage/getProfile
 * @see module:storage/saveToken
 * @see module:storage/getToken
 * @see module:storage/checkIfLoggedIn
 * @see module:storage/logOut
 */

/**
 * @function saveProfile
 * @param {object} profile
 * @description This module saves the profile to local storage.
 * @returns {void}
 * @example
 * saveProfile({name: "name"});
 */

export function saveProfile(profile) {
  localStorage.setItem("profile", JSON.stringify(profile));
}

/**
 * @function getProfile
 * @description This module gets the profile from local storage.
 * @returns {object} profile
 */

export function getProfile() {
  const profile = localStorage.getItem("profile");
  return JSON.parse(profile);
}

/**
 * @function saveToken
 * @param {string} token
 * @description This module saves the token to local storage.
 * @returns {void}
 * @example
 * saveToken("token");
 */

export function saveToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

/**
 * @function getToken
 * @description This module gets the token from local storage.
 * @returns {string} token
 */

export function getToken() {
  const token = localStorage.getItem("token");
  return JSON.parse(token);
}

/**
 * @function checkIfLoggedIn
 * @description This module checks if the user is logged in.
 * @returns {boolean} true if logged in, false if not logged in
 */

export function checkIfLoggedIn() {
  const token = getToken();
  return token ? true : false;
}

/**
 * @function logOut
 * @description This module logs out the user.
 * @returns {void}
 * @example
 * logOut();
 */

export function logOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("profile");
}
