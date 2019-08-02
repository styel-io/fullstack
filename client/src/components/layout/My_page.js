import React, { Component, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { load } from "../../actions/auth";
import axios from "axios";

import { getCurrentProfile } from "../../actions/profile";

const My_page = ({
  getCurrentProfile,
  auth: { user, validate_checkpass },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">My_page</h1>
      <p className="lead" />
      {profile !== null ? (
        <Fragment />
      ) : (
        <Fragment>
          <img src={user.avatar} />
          <h2>{user.email}</h2>
          <p>{user.role}</p>
          <Link to="/Check_pass" className="btn btn-primary my-1">
            Update Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

My_page.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(My_page);
