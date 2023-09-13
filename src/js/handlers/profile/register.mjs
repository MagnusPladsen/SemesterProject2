import * as auth from "../../api/auth/index.mjs";

/**
 * @module handlers/profile/register
 * @description This function sets the listener for the register form. It uses the data from the form to call the register function from the API.
 * @returns {void}
 */

export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  if (!form) {
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    // send to API
    auth.register(profile);
  });
}
