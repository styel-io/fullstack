import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import Alert from "../Alert";
import { setAlert } from "../../actions/alert";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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

const ForgotPassword = ({ setAlert, isAuthenticated }) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: "",
    showError: false,
    messageFromServer: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, messageFromServer, showError, showNullError } = values;

  // 이벤트 발생시 e(이벤트)값을 인자로 받아 이메일을 보내는 함수
  const sendEmail = e => {
    e.preventDefault();

    if (email === "") {
      setValues({
        showError: false,
        messageFromServer: ""
      });
      setAlert("Please include a valid email", "negative");
    } else {
      // 이메일 값이 존재하면 백엔드 서버 /forgotPassword 경로로 post 요청을 한다. email 값을 넣어서.
      axios
        .post("/api/auth/forgotpassword", {
          email: email
        })
        .then(response => {
          console.log(response.data.errors);
          //   만약 응답받은 데이터 메시지가 'email not in database'이면 상태값 showError를 true로 변경시킨다.
          if (response.data === "email not in db") {
            setValues({
              showError: true,
              messageFromServer: ""
            });
            // 'recovery email sent' 메시지를 전달받으면 아래와 같이 state를 변경한다.
          } else if (response.data === "recovery email sent") {
            setValues({
              showError: false,
              messageFromServer: "recovery email sent"
            });
            setAlert("Password Reset Email Successfully Sent!", "negative");
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {/* form에서 submit을 하면 sendEmail 함수를 실행한다. */}
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

      {showNullError && (
        <div>
          <p>The email address cannot be null.</p>
        </div>
      )}

      {showError && (
        <div>
          <p>
            That email address isn't recognized. Please try again or register
            for a new account
          </p>
          <Link to={"/register"}>
            <Button
              size="large"
              fullWidth="true"
              variant="outlined"
              type="submit"
            >
              Register
            </Button>{" "}
          </Link>
        </div>
      )}

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
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert }
)(ForgotPassword);
