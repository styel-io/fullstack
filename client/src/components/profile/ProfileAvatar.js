import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Image } from "semantic-ui-react";

import "../../styles/components/profile/ProfileAvatar.css";

const ProfileAvatar = ({ user }) => {
  return (
    <div className="Profile__avatar-img-wrapper">
      <Image
        src={user.avatar}
        className="Profile__avatar-img"
        alt={`${user.name} profile`}
      />
    </div>
  );
};

ProfileAvatar.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(ProfileAvatar);
