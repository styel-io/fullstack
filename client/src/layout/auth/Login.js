import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Alert from "../Alert";
import { Grid } from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#22b573",
    borderColor: "#22b573"
  },
  label: {
    color: "#22b573"
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
    <Fragment>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 350 }} className="signform">
          {/* <Typography variant="h3" gutterBottom>
            STYEL
          </Typography> */}

          <form className={classes.container} onSubmit={e => onSubmit(e)}>
            <TextField
              fullWidth="true"
              id="standard-email"
              label="Email"
              type="email"
              placeholder="Email Address"
              className={classes.textField}
              value={values.email}
              onChange={handleChange("email")}
              margin="normal"
            />
            <TextField
              fullWidth="true"
              id="standard-password"
              label="Password"
              type="password"
              placeholder="Password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange("password")}
              margin="normal"
            />
            <Button
              fullWidth="true"
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.buttonPrimary}
            >
              Login
            </Button>
            <Button
              size="large"
              fullWidth="true"
              variant="outlined"
              type="submit"
              className={classes.button}
            >
              New to us? <Link to="/register">&nbsp; Sign Up</Link>
            </Button>
            <Link to="/forgotpassword">ForgotPassword</Link>
          </form>

          <Alert />
        </Grid.Column>
      </Grid>
    </Fragment>
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
