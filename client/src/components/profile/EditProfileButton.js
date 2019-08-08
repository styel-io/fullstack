import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%"
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  buttonPrimary: {
    margin: theme.spacing(1),
    marginTop: "1rem",
    marginBottom: "1rem",
    color: "#22b573",
    borderColor: "#22b573"
  },
  label: {
    color: "#22b573"
  }
}));

const EditProfileButton = ({ props, logout }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <Button
        size="large"
        variant="outlined"
        type="submit"
        className={classes.button}
      >
        <Link to="/Check_pass">&nbsp; Edit Profile</Link>
      </Button>

      <Button
        size="large"
        variant="outlined"
        type="submit"
        className={classes.button}
      >
        <Link onClick={logout} to="/">
          <span className="hide-sm"> Logout</span>
        </Link>
      </Button>
    </Fragment>
  );
};

EditProfileButton.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(EditProfileButton);
