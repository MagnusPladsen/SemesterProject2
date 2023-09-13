import * as profile from "../../api/profile/index.mjs";
import * as URL from "../../url/index.mjs";
import * as storage from "../../storage/index.mjs";

/**
 * @module handlers/profile/follow
 * @description This module contains all the functions related to following and unfollowing users. Gets the profile from local storage and checks the following list to see if the user is already following the profile. If the user is following the profile, the unfollow button is displayed. If the user is not following the profile, the follow button is displayed. When the follow button is clicked, the user is added to the following list and the profile is updated in the database. When the unfollow button is clicked, the user is removed from the following list and the profile is updated in the database.
 * @see module:api/profile
 * @see module:url
 * @see module:storage
 * @returns {void}
 */

export function setFollowUserListener() {
  const followButton = document.querySelector("#followButton");
  const unFollowButton = document.querySelector("#unFollowButton");
  const name = URL.getParams("name");

  const loggedInUser = storage.getProfile();
  const followingList = loggedInUser.following;
  const isFollowing = followingList.map((user) => user.name).includes(name);

  if (!isFollowing) {
    unFollowButton.style.display = "none";
    followButton.style.display = "block";
  } else if (isFollowing) {
    followButton.style.display = "none";
    unFollowButton.style.display = "block";
  }

  if (followButton && unFollowButton) {
    followButton.addEventListener("click", async () => {
      await profile.followUser(name, "follow");
      // update local storage profile to include new following
      storage.saveProfile(await profile.getProfile(loggedInUser.name));
      window.location.reload();
    });
    unFollowButton.addEventListener("click", async () => {
      await profile.followUser(name, "unfollow");
      // update local storage profile to remove following
      storage.saveProfile(await profile.getProfile(loggedInUser.name));
      window.location.reload();
    });
  }
}
