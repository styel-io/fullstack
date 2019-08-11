import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../Alert";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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

const Login = ({ login, isAuthenticated }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { email, password } = values;

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
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
            id="email"
            label="Email Address"
            type="email"
            placeholder="Email Address"
            className={classes.textField}
            value={values.email}
            onChange={handleChange("email")}
            // autoFocus
          />
          <TextField
            fullWidth
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange("password")}
            // autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="inherit"
            size="large"
            className={classes.submit}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        <Alert />
      </div>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
