import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "../Alert";
import { forgotPassword } from "../../actions/auth";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

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

const ForgotPassword = ({ forgotPassword, isAuthenticated }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email } = values;

  // 이벤트 발생시 e(이벤트)값을 인자로 받아 이메일을 보내는 함수
  const sendEmail = e => {
    e.preventDefault();
    forgotPassword({ email });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <form className={classes.container} onSubmit={sendEmail}>
        <TextField
          fullWidth
          id="forgotPassword-email"
          label="Email Address"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          placeholder="Email Address"
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
          Send Password Reset Email
        </Button>
      </form>

      <Link to={"/"}>
        <Button size="large" fullWidth variant="outlined">
          Home
        </Button>
      </Link>
      <Alert />
    </Container>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { forgotPassword }
)(ForgotPassword);
