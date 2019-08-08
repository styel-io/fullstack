import React, { Component } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "semantic-ui-react";


const loading = {
  margin: "1rem",
  fontsize: "24px"
};


class ResetPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      update: false,
      isLoading: true,
      error: false
    };
  }

  //   The Initial Component Did Mount Lifecycle Method
  async componentDidMount() {
    console.log(this.props.match.params.token);
    await axios
      .get("/api/auth/reset", {
        params: {
          resetPasswordToken: this.props.match.params.token
        }
      })
      .then(response => {
        console.log(response);
        if (response.data.message === "password reset link a-ok") {
          this.setState({
            email: response.data.email,
            update: false,
            isLoading: false,
            error: false
          });
        } else {
          this.setState({
            update: false,
            isLoading: false,
            error: true
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  //   The Update Password Function
  updatePassword = async e => {
    e.preventDefault();
    axios
      .put("/api/auth/updatePasswordViaEmail", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message === "password updated") {
          this.setState({
            updated: true,
            error: false
          });
        } else {
          this.setState({
            updated: false,
            error: true
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };

  // The Render Method
  render() {
    const { password, error, isLoading, updated } = this.state;

    if (error) {
      return (
        <div>
          <div style={loading}>
            <h4>Problem resetting password. Please send another reset link.</h4>
           
          <Button
          size="large"
          fullWidth="true"
          variant="outlined"
          
          href={"/"}
        >
          Go Home
        </Button>
        <Button
          size="large"
          fullWidth="true"
          variant="outlined"
         
          href={"/forgotpassword"}
        >
          Forgot Password?
        </Button>
        
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          
          <div style={loading}>Loading User Data ...</div>
        </div>
      );
    } else {
      return (
        <div>
          <form className="resetPassword-form" onSubmit={this.updatePassword}>
          <TextField fullWidth="true"
            id="resetPassword"
            label="password"  type="password"
            value={password}
            onChange={this.handleChange("password")}
            placeholder="Password" margin="normal"
          />
           <Button
            size="large"
            fullWidth="true"
            variant="outlined"
            type="submit"
          >
            Update Password
          </Button>
          </form>
          {updated && (
            <div>
              <p>
                Your password has been successfully reset, please try logging in
                again.
              </p>
              <Button
          size="large"
          fullWidth="true"
          variant="outlined"
          href={"/login"}
        >
          Login
        </Button> 
            </div>
          )}
          <Button
          size="large"
          fullWidth="true"
          variant="outlined"
          href={"/"}
        >
         Go Home
        </Button>
        
        </div>
      );
    }
  }
}

export default ResetPassword;