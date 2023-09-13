import * as post from "../../api/posts/index.mjs";
import * as URL from "../../url/index.mjs";

/**
 * @async
 * @module display/posts/profilePosts
 * @description This function displays the posts of a user on their profile page. It also displays the edit, view and delete buttons if the user is logged in and viewing their own profile.
 * @param {array} postsList - Array of posts.
 * @returns {void}
 * @example
 * displayProfilePosts(postsList);
 */

export async function displayProfilePosts(postsList) {
  const postsContainer = document.querySelector("#postsContainer");
  const path = URL.getPath();

  if (!postsList || !postsContainer) {
    return;
  }

  postsContainer.innerHTML = "";
  postsList.map((post) => {
    postsContainer.innerHTML += `
        <div id="${
          post.id
        }" class="bg-gray-100 border border-gray-300 rounded shadow p-4 flex flex-col gap-4 transition-all w-full md:max-w-[400px] justify-between">
          <p class="text-lg font-bold transition-all">${post.title}</p>
          <p class="text-left pb-4">${post.body}</p>
          <div class="flex items-center justify-between w-full gap-5 text-xs font-bold text-gray-400">
            <p class="">${post.created.slice(0, 10)}
            </p>
                <div class="flex gap-2">
                <a href="/post/?id=${post.id}"
              ><button
              class="px-4 py-2 border hover:bg-white bg-secondary hover:text-secondary text-white border-secondary rounded w-fit mx-auto transition-all hover:scale-110"
              >
                View
              </button>
            </a>
            ${
              path === "/profile/"
                ? `
            <a href="/post/edit/?id=${post.id}"
              ><button
              class="px-4 py-2 border hover:bg-secondary bg-white hover:text-white text-secondary border-secondary rounded w-fit mx-auto transition-all hover:scale-110"
              >
                Edit
              </button>
            </a>
              <button class="deletePost px-4 py-2 border hover:bg-red-500 bg-white hover:text-white text-red-500 border-red-500 rounded w-fit mx-auto transition-all hover:scale-110"
              >
                Delete
              </button>`
                : ""
            }
            </div>
          </div>
        </div>`;
  });

  const deleteButtons = document.querySelectorAll(".deletePost");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const id = e.target.parentElement.parentElement.parentElement.id;
      await post.deletePost(id);
      window.location.reload();
    });
  });
}
