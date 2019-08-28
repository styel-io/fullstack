import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../Alert";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Divider from "@material-ui/core/Divider";
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
  submit: {
    margin: theme.spacing(3, 0, 2)
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

const Register = ({ setAlert, register, isAuthenticated }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    call_num: "",
    password: "",
    password2: "",
    role: "member"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { name, email, call_num, password, password2, role } = values;

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "negative");
    } else {
      register({ name, email, call_num, password, role });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.container} onSubmit={e => onSubmit(e)}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            type="text"
            placeholder="Name"
            className={classes.textField}
            value={values.name}
            onChange={handleChange("name")}
          />
          <TextField
            fullWidth
            id="email"
            label="Email"
            type="email"
            placeholder="Email Address"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            fullWidth
            id="call_num"
            label="Phone number"
            type="text"
            placeholder="Write down your phone number without '-'."
            className={classes.textField}
            value={values.call_num}
            onChange={handleChange("call_num")}
          />
          <Divider variant="middle" />
          <TextField
            fullWidth
            id="standard-password"
            label="Password"
            type="password"
            placeholder="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
          />
          <TextField
            fullWidth
            id="standard-password2"
            label="Confirm Password"
            type="password"
            placeholder="Confirm Password"
            className={classes.textField}
            value={values.password2}
            onChange={handleChange("password2")}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="inherit"
            size="large"
            className={classes.submit}
          >
            Register
          </Button>
          <Link to="/login" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </form>
        <Alert />
      </div>
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
