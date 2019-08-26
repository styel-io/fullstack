import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Alert from "../Alert";
import { updatePassword, getResetPasswordToken } from "../../actions/auth";

import TextField from "@material-ui/core/TextField";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

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

const ResetPassword = ({
  getResetPasswordToken,
  updatePassword,
  match,
  auth: { user },
  isAuthenticated
}) => {
  useEffect(() => {
    getResetPasswordToken(match.params.token);
  }, [getResetPasswordToken, match.params.token]);

  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: user.email,
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { password } = values;

  //   The Update Password Function
  const onSubmit = async e => {
    e.preventDefault();
    updatePassword({ password, email: user.email });
  };

  return !isAuthenticated && !user.email ? (
    <Fragment>
      <ColorLinearProgress /> <Alert />
    </Fragment>
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <form className={classes.container} onSubmit={e => onSubmit(e)}>
        <TextField
          disabled
          fullWidth
          className={classes.textField}
          value={user.email}
        />

        <TextField
          fullWidth
          id="resetPassword"
          label="password"
          type="password"
          value={values.password}
          onChange={handleChange("password")}
          placeholder="Password"
          className={classes.textField}
        />

        <Button
          type="submit"
          fullWidth
          variant="outlined"
          color="inherit"
          size="large"
          className={classes.submit}
        >
          Update Password
        </Button>
      </form>
      <Alert />
    </Container>
  );
};

ResetPassword.propTypes = {
  updatePassword: PropTypes.func.isRequired,
  getResetPasswordToken: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getResetPasswordToken, updatePassword }
)(ResetPassword);
