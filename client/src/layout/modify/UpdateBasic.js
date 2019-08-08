import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { updatebasic } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../../layout/Alert";
import { Grid, Divider } from "semantic-ui-react";
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

const UpdateBasic = ({
  setAlert,
  auth: { user },
  updatebasic,
  isAuthenticated
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    name: user.name,
    email: user.email,
    password: "",
    password2: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { name, email, password, password2 } = values;

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "negative");
    } else {
      updatebasic({ name, email, password });
    }
  };

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 350 }} className="signform">
          <Typography variant="h3" gutterBottom>
            STYLE
          </Typography>

          <form className={classes.container} onSubmit={e => onSubmit(e)}>
            <TextField
              fullWidth="true"
              id="standard-name"
              label="Name"
              type="text"
              placeholder="Name"
              className={classes.textField}
              value={values.name}
              onChange={handleChange("name")}
              margin="normal"
            />

            <TextField
              disabled
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
            <Divider variant="middle" />
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
            <TextField
              fullWidth="true"
              id="standard-password2"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              className={classes.textField}
              value={values.password2}
              onChange={handleChange("password2")}
              margin="normal"
            />

            <Button
              fullWidth="true"
              variant="outlined"
              type="submit"
              color="primary"
              className={classes.buttonPrimary}
            >
              Register
            </Button>
          </form>
          <Alert />
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

UpdateBasic.propTypes = {
  setAlert: PropTypes.func.isRequired,
  updatebasic: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, updatebasic }
)(UpdateBasic);
