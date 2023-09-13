import { API_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import * as profile from "../profile/index.mjs";

const action = "/auth/login";
const method = "POST";

/**
 * @async
 * @module api/auth/login
 * @description This function sends a POST request to the API to log in a user.
 * @param {object} profileData - Login data from the login form.
 * @returns {void}
 * @throws {error} An error is thrown if the API call fails.
 * @example
 * const profileData = {
 *  name: "username",
 * password: "password",
 * };
 * login(profileData);
 */

export async function login(profileData) {
  const url = `${API_URL}${action}`;
  const body = JSON.stringify(profileData);
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
    }

    const { accessToken, ...user } = data;

    if (accessToken === undefined) {
      alert("Incorrect username or password. Please try again.");
      return;
    }

    storage.saveToken(accessToken);

    // get full profile with following and followers array
    const fullProfile = await profile.getProfile(user.name);

    storage.saveProfile(fullProfile);

    // redirect to profile page if logged in successfully
    if (storage.checkIfLoggedIn()) {
      window.location.href = "/posts/";
    }
  } catch (error) {
    console.log(error);
  }
}
