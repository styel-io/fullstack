import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { check } from "../actions/auth";
import Alert from "../layout/Alert";
import { Grid, Menu } from "semantic-ui-react";
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

const Check_pass = ({
  auth: { user, validate_checkpass },
  check,
  isAuthenticated
}) => {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    email: user.email,
    password: ""
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { password, email } = values;

  const onSubmit = async e => {
    e.preventDefault();
    check(password, email);
  };

  const checkPass = (
    <form className={classes.container} onSubmit={e => onSubmit(e)}>
      <TextField
        disabled
        label="Email"
        fullWidth="true"
        name="email"
        className={classes.textField}
        value={user.email}
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
        size="large"
        fullWidth="true"
        variant="outlined"
        type="submit"
        color="primary"
        className={classes.buttonPrimary}
      >
        Password Certify
      </Button>
    </form>
  );

  // const updateButton = (
  //   <div>
  //     <Link to="/basic">
  //       <button>Basic Information</button>
  //     </Link>
  //     <Link to="/add">
  //       <button>Additional Information</button>
  //     </Link>
  //   </div>
  // );

  // 로그인이 안된 경우 리다이렉트
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
          <br />
          <Menu.Item>
            {/* {user.url ? checkPass} */}
            {/* {validate_checkpass ? updateButton : checkPass} */}
            {validate_checkpass ? <Redirect to="/basic" /> : checkPass}
          </Menu.Item>
          <Alert />
          {/* <Message id="replaceAlert">
            New to us? <Link to="/register">&nbsp; Sign Up</Link>
          </Message> */}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

Check_pass.propTypes = {
  check: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { check }
)(Check_pass);
