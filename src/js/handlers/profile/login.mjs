import { login } from "../../api/auth/login.mjs";

/**
 * @module handlers/profile/login
 * @description This function sets the listener for the login form. It uses the data from the form to call the login function from the API.
 * @returns {void}
 */

export function setLoginFormListener() {
  const form = document.querySelector("#loginForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    // send to API
    login(profile);
  });
}
