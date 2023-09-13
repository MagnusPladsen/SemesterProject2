import * as posts from "../../api/posts/index.mjs";
import * as URL from "../../url/index.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * @module display/post
 * @description This function displays all the posts. Gets the id from the URL params, and uses it to get the post from the API and display them.
 * @returns {void}
 */


export async function displayPost() {
  const postId = URL.getParams("id");
  const post = await posts.getPost(postId);

  const loggedInUser = storage.getProfile();

  // comments
  // reactions
  if (!post) {
    return;
  }

  const postTitle = document.querySelector("#postTitle");
  const postContent = document.querySelector("#postContent");
  const postDate = document.querySelector("#postDate");
  const postAuthor = document.querySelector("#postAuthor");
  const postMedia = document.querySelector("#postMedia");
  const postTags = document.querySelector("#postTags");
  postTitle.innerHTML = post.title;
  postContent.innerHTML = post.body;
  postDate.innerHTML = `Posted: <span class="font-bold">${post.created.slice(
    0,
    10
  )}</span>`;
  postAuthor.innerHTML = `By: <a href="
  ${
    loggedInUser.name === post.author.name
      ? "/profile/"
      : `/profile/user/?name=${post.author.name}`
  }" class="font-bold hover:text-red-500 hover:underline underline-offset-2"><div class="flex items-center gap-1"><p>${
    post.author.name
  }</p><img
  id="profilePicture"
  src="${
    post.author.avatar
      ? post.author.avatar
      : "/src/images/ProfilePlaceHolder.svg"
  }"
  alt="Profile picture"
  height="15"
  width="25"
  class="rounded-full transition-all"
  /></div></a>`;
  if (post.media) {
    postMedia.innerHTML = `
    <img
    src="${post.media}"
    alt="Post media"
    class="w-full object-cover h-auto rounded" /> `;
  }
  if (post.tags) {
    postTags.innerHTML = `
      Tags: ${post.tags.map(
        (tag) => `<span class="ml-1 font-bold text-black">${tag}</span>`
      )}
    `;
  }
}
