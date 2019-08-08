import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Grid } from "semantic-ui-react";

import ProfileAvatar from "../components/profile/ProfileAvatar";
import EditProfileButton from "../components/profile/EditProfileButton";
import ProfileStatus from "../components/profile/ProfileStatus";
import ProfileEtcMenu from "../components/profile/ProfileEtcMenu";
import ProfileDetail from "../components/profile/ProfileDetail";

import "../styles/containers/ProfileInfo.css";

const ProfileInfo = ({ auth: { user } }) => {
  return (
    <Grid>
      <Grid.Column width={6}>
        <ProfileAvatar />
      </Grid.Column>
      <Grid.Column width={10}>
        <h3 className="Profile__username">{user.name}</h3>
        <EditProfileButton />
        <ProfileEtcMenu />
        <ProfileStatus />
        <ProfileDetail />
      </Grid.Column>
    </Grid>
  );
};

ProfileInfo.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileInfo);
