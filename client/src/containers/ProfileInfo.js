import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

import { getPostById } from "../actions/post";

import ProfileAvatar from "../components/profile/ProfileAvatar";
import EditProfileButton from "../components/profile/EditProfileButton";
import ProfileStatus from "../components/profile/ProfileStatus";
import ProfileEtcMenu from "../components/profile/ProfileEtcMenu";
import ProfileDetail from "../components/profile/ProfileDetail";

import "../styles/containers/ProfileInfo.css";

import FeedBox from "../containers/FeedBox";

const ProfileInfo = ({
  getPostById,
  auth: { user },
  post: { posts, loading }
}) => {
  useEffect(() => {
    getPostById(user._id);
  }, [getPostById]);
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <ProfileAvatar />
        </Grid>
        <Grid item xs={8}>
          <h3 className="Profile__username">{user.name}</h3>
          <EditProfileButton />
          <ProfileEtcMenu />
          <ProfileStatus />
          <ProfileDetail />
        </Grid>
      </Grid>
      <div>
        {posts.map(post => (
          <FeedBox key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

ProfileInfo.propTypes = {
  getPostById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostById }
)(ProfileInfo);
