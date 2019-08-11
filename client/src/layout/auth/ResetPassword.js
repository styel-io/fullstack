import React, { useEffect, Fragment } from "react";
import axios from "axios";
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

  const { password, email } = values;

  //   The Update Password Function
  const onSubmit = async e => {
    e.preventDefault();
    updatePassword({ password, email: user.email });
  };
  //   The Update Password Function
  // const onSubmit = async e => {
  //   axios.put("/api/auth/updatePasswordViaEmail", {
  //     email: user.email,
  //     password: password
  //   });
  // };

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

// class ResetPassword extends Component {
//   constructor() {
//     super();

//     this.state = {
//       email: "",
//       password: "",
//       confirmPassword: "",
//       update: false,
//       isLoading: true,
//       error: false
//     };
//   }

//   //   The Initial Component Did Mount Lifecycle Method
//   async componentDidMount() {
//     console.log(this.props.match.params.token);
//     await axios
//       .get("/api/auth/reset", {
//         params: {
//           resetPasswordToken: this.props.match.params.token
//         }
//       })
//       .then(response => {
//         console.log(response);
//         if (response.data.message === "password reset link a-ok") {
//           this.setState({
//             email: response.data.email,
//             update: false,
//             isLoading: false,
//             error: false
//           });
//         } else {
//           this.setState({
//             update: false,
//             isLoading: false,
//             error: true
//           });
//         }
//       })
//       .catch(error => {
//         console.log(error.data);
//       });
//   }

//   handleChange = name => event => {
//     this.setState({
//       [name]: event.target.value
//     });
//   };

//   //   The Update Password Function
//   updatePassword = async e => {
//     e.preventDefault();
//     axios
//       .put("/api/auth/updatePasswordViaEmail", {
//         email: this.state.email,
//         password: this.state.password
//       })
//       .then(response => {
//         console.log(response.data);
//         if (response.data.message === "password updated") {
//           this.setState({
//             updated: true,
//             error: false
//           });
//         } else {
//           this.setState({
//             updated: false,
//             error: true
//           });
//         }
//       })
//       .catch(error => {
//         console.log(error.data);
//       });
//   };

//   // The Render Method
//   render() {
//     const { password, error, isLoading, updated } = this.state;

//     if (error) {
//       return (
//         <div>
//           <div style={loading}>
//             <h4>Problem resetting password. Please send another reset link.</h4>

//             <Button size="large" fullWidth="true" variant="outlined" href={"/"}>
//               Go Home
//             </Button>
//             <Button
//               size="large"
//               fullWidth="true"
//               variant="outlined"
//               href={"/forgotpassword"}
//             >
//               Forgot Password?
//             </Button>
//           </div>
//         </div>
//       );
//     } else if (isLoading) {
//       return (
//         <div>
//           <div style={loading}>Loading User Data ...</div>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <form className="resetPassword-form" onSubmit={this.updatePassword}>
//             <TextField
//               fullWidth="true"
//               id="resetPassword"
//               label="password"
//               type="password"
//               value={password}
//               onChange={this.handleChange("password")}
//               placeholder="Password"
//               margin="normal"
//             />
//             <Button
//               size="large"
//               fullWidth="true"
//               variant="outlined"
//               type="submit"
//             >
//               Update Password
//             </Button>
//           </form>
//           {updated && (
//             <div>
//               <p>
//                 Your password has been successfully reset, please try logging in
//                 again.
//               </p>
//               <Button
//                 size="large"
//                 fullWidth="true"
//                 variant="outlined"
//                 href={"/login"}
//               >
//                 Login
//               </Button>
//             </div>
//           )}
//           <Button size="large" fullWidth="true" variant="outlined" href={"/"}>
//             Go Home
//           </Button>
//         </div>
//       );
//     }
//   }
// }

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