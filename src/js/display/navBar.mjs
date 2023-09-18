/**
 * @module src/js/display/navBar
 * @description This module contains all the functions related to displaying the logged in version of the navigation bar.
 * @param {HTMLelements} navList array of HTMLelements
 * @param {object} profile profile object
 * @param {string} path path of the current page
 * @example
 * const navList = document.querySelectorAll("nav ul li");
 * const profile = {
 * name: "John Doe",
 * avatar: "/src/images/whiteProfilePlaceHolder.svg",
 * };
 * const path = "/listings/";
 * displayLoggedInNavBar(navList, profile, path)
 */

export function displayLoggedInNavBar(navList, profile, path) {
  navList.innerHTML = `
  <li
  class="hover:cursor-pointer transition-all ${
    path === "/listings/"
      ? "opacity-100 underline underline-offset-4"
      : "opacity-70 hover:opacity-100 hover:underline hover:underline-offset-4"
  } "
>
  <a href="/listings/"> Home </a>
</li>
<li class="hover:cursor-pointer transition-all ${
    path === "/listing/new/"
      ? "opacity-100 underline underline-offset-4"
      : "opacity-70 hover:opacity-100 hover:underline hover:underline-offset-4"
  } ">
  <a href="/listing/new"> New listing </a>
</li>
<li
  class="hover:cursor-pointer  transition-all flex gap-2 items-center ${
    path === "/profile/"
      ? "opacity-100 underline underline-offset-4"
      : "opacity-70 hover:opacity-100 hover:underline hover:underline-offset-4"
  } "
>

  <a href="/profile/"> ${profile.name} </a>
  <img
id="profilePicture"
src="${
    profile.avatar ? profile.avatar : "/src/images/whiteProfilePlaceHolder.svg"
  }"
alt="Profile picture"
height="30"
width="30"
class="rounded-full transition-all border-white border"
/>
</li>
`;
}
