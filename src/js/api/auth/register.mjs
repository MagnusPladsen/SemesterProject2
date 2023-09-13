import { API_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "POST";

/**
 * @async
 * @module api/auth/register
 * @description This function sends a POST request to the API to register the user.
 * @param {object} profile - Register data from the register form.
 * @returns {void}
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const profileData = {
 *  name: "username",
 *  password: "password",
 *  email: "email@noroff.no",
 *  avatar: "url",
 *  banner: "url",
 * };
 * register(profile);
 */

export async function register(profile) {
  const url = `${API_URL}${action}`;
  const body = JSON.stringify(profile);
  const headers = {
    "Content-Type": "application/json",
  };

  const error = document.querySelector("#error");

  try {
    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    const data = await response.json();

    if (data.errors) {
      error.classList.remove("hidden");
      error.innerHTML = data.errors[0].message;
      return;
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    error.classList.remove("hidden");
    error.innerHTML = error;
  }
}
