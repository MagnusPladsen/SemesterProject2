import * as listing from "../../api/listings/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @async
 * @module display/listings/profilelistings
 * @description This function displays the listings of a user on their profile page. It also displays the edit, view and delete buttons if the user is logged in and viewing their own profile.
 * @param {array} listingsList - Array of listings.
 * @returns {void}
 * @example
 * displayProfilelistings(listingsList);
 */

export async function displayProfileListings(listingsList, listingsContainer) {
  const path = URL.getPath();

  if (!listingsList || !listingsContainer) {
    return;
  }

  listingsContainer.innerHTML = "";
  listingsList.map((listing) => {
    listingsContainer.innerHTML += `
        <div id="${
          listing.id
        }" class="bg-background border border-gray-300 rounded shadow p-4 flex flex-col gap-4 transition-all w-full md:max-w-[400px] justify-between">
          <p class="text-lg font-bold transition-all">${listing.title}</p>
          <p class="text-left pb-4">${listing.description}</p>
          <div class="flex items-center justify-between w-full gap-5 text-xs font-bold text-gray-400">
            <p class="">Ending: ${listing.endsAt.slice(0, 10)}
            </p>
                <div class="flex gap-2">
                ${
                  path === "/profile/"
                    ? `<a href="/profile/listing/?id=${listing.id}"
              ><button
              class="px-4 py-2 border hover:bg-primary bg-white hover:text-white text-primary border-primary rounded w-fit mx-auto transition-all hover:scale-110"
              >
                View
              </button>
            </a>`
                    : `<a href="/listing/?id=${listing.id}"
            ><button
            class="px-4 py-2 border hover:bg-primary bg-white hover:text-white text-primary border-primary rounded w-fit mx-auto transition-all hover:scale-110"
            >
              View
            </button>
          </a>`
                }
            ${
              path === "/profile/"
                ? `
            <a href="/listing/edit/?id=${listing.id}"
              ><button
              class="px-4 py-2 border bg-primary hover:text-primary border-primary hover:bg-white rounded w-fit mx-auto text-white transition-all hover:scale-110"
              >
                Edit
              </button>
            </a>
              <button class="deleteListing px-4 py-2 border hover:bg-red-500 bg-white hover:text-white text-red-500 border-red-500 rounded w-fit mx-auto transition-all hover:scale-110"
              >
                Delete
              </button>`
                : ""
            }
            </div>
          </div>
        </div>`;
  });

  const deleteButtons = document.querySelectorAll(".deleteListing");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.parentElement.parentElement.parentElement.id;
      await listing.deleteListing(id);
      window.location.reload();
    });
  });
}
