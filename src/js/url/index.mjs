/**
 * @module url
 * @description This module contains all the functions related to the url.
 * @see module:url/getPath
 * @see module:url/getParams
 */

/**
 * @function getPath
 * @returns {string} path
 */

export function getPath() {
  return window.location.pathname;
}

/**
 * @function getParams
 * @description This function returns the parameters of the url.
 * @param {string} search
 * @returns {string} params
 * @example
 * getParams("id")
 */

export function getParams(search) {
  const params = new URLSearchParams(window.location.search);
  return params.get(search);
}
