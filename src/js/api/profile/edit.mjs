import { authFetch } from "../auth/authFetch.mjs";
import { API_URL } from "../constants.mjs";

const action = "/profiles/";
const method = "PUT";

/**
 * @async
 * @module api/auth/edit
 * @description This function sends a PUT request to the API to edit a profile. It uses the authFetch function to send the request with the access token.
 * @see module:authFetch
 * @param {object} profileData
 * @param {string} name
 * @returns profileObject from API
 */

export async function edit(profileData, name) {
  const url = `${API_URL}${action}${name}/media`;
  const body = JSON.stringify(profileData);

  const error = document.querySelector("#error");

  try {
    const response = await authFetch(url, {
      method,
      body,
    });
    const data = await response.json();

    if (data.errors) {
      error.classList.remove("hidden");
      error.innerHTML = data.errors[0].message;
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}
