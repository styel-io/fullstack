import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profile";

import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

// containers
import ProfileInfo from "../containers/ProfileInfo";

// css
import "../styles/Profile.css";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#cedfd6;"
  },
  barColorPrimary: {
    backgroundColor: "#22b573;"
  }
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(2),
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  buttonPrimary: {
    margin: theme.spacing(1),
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#22b573",
    borderColor: "#22b573"
  },
  label: {
    color: "#22b573"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const ProfileMe = ({ getCurrentProfile, profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const classes = useStyles();

  return loading && profile === null ? (
    <ColorLinearProgress />
  ) : (
    <ProfileInfo />
  );
};

ProfileMe.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ProfileMe);
