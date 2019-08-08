import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProfileDetail = ({ profile: { profile } }) => {
  return profile === null ? (
    <div>프로파일 없을때 나오는 정보</div>
  ) : (
    <div>
      <div>{profile.location}</div>
      <div>{profile.status}</div>
      <div>{profile.website}</div>
    </div>
  );
};

ProfileDetail.propTypes = {
  profile: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ProfileDetail);
