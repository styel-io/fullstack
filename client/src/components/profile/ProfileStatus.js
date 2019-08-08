import React from "react";

const ProfileStatus = props => {
  return (
    <div className="Profile__stats">
      <div className="Profile__stats-item">
        <span className="Profile__stats-count">
          {/* 포스트 개수 시작 */}
          {/* {user.postIds.length} */} 20
        </span>{" "}
        {/* {pluralize(user.postIds.length, "post", "posts")} */}
        posts
      </div>
      <div
        className="Profile__stats-item Profile__stats-item--link"
        onClick={() => this._openUsersModal("followers")}
      >
        <span className="Profile__stats-count">
          {/* {user.followersCount} */} 10
        </span>
        {/* {pluralize(user.followersCount, "follower", "followers")} */}
        followers
      </div>
      <div
        className="Profile__stats-item Profile__stats-item--link"
        onClick={() => this._openUsersModal("following")}
      >
        <span className="Profile__stats-count">
          {/* {user.followingCount} */}56
        </span>
        {/* {pluralize(user.followingCount, "following", "following")} */}
        following
      </div>
    </div>
  );
};

export default ProfileStatus;
