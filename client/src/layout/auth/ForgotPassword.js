import React, { Component} from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Grid } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";


class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      showError: false,
      messageFromServer: ""
    };
  }

 
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // 이벤트 발생시 e(이벤트)값을 인자로 받아 이메일을 보내는 함수
  sendEmail = e => {
    e.preventDefault();

    if (this.state.email === "") {
      this.setState({
        showError: false,
        messageFromServer: ""
      });
    } else {
      // 이메일 값이 존재하면 백엔드 서버 /forgotPassword 경로로 post 요청을 한다. email 값을 넣어서.
      axios
        .post("/api/auth/forgotpassword", {
          email: this.state.email
        })
        .then(response => {
          console.log(response.data);
          //   만약 응답받은 데이터 메시지가 'email not in database'이면 상태값 showError를 true로 변경시킨다.
          if (response.data === "email not in database") {
            this.setState({
              showError: true,
              messageFromServer: ""
            });
            // 'recovery email sent' 메시지를 전달받으면 아래와 같이 state를 변경한다.
          } else if (response.data === "recovery email sent") {
            this.setState({
              showError: false,
              messageFromServer: "recovery email sent"
            });
          }
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  };

  render() {
    const { email, messageFromServer, showError, showNullError } = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }} className="forgotPasswordForm">
        
        {/* form에서 submit을 하면 sendEmail 함수를 실행한다. */}
        <form className="forgotPassword-form" onSubmit={this.sendEmail}>
          <TextField fullWidth="true"
            id="forgotPassword-email"
            label="email"  type="email"
            value={email}
            onChange={this.handleChange("email")}
            placeholder="Email Address" margin="normal"
          />
          <Button
            size="large"
            fullWidth="true"
            variant="outlined"
            type="submit"
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

            <Button
              size="large"
              fullWidth="true"
              variant="outlined"
              type="submit"
              href={"/register"}
            >
              Register
            </Button>
          </div>
        )}

        {messageFromServer === "recovery email sent" && (
          <div>
            <h3>Password Reset Email Successfully Sent!</h3>
          </div>
        )}

        <Button
          size="large"
          fullWidth="true"
          variant="outlined"
          type="submit"
          href={"/"}
        >
          Go Home
        </Button>
       
        </Grid.Column>
      </Grid>
    );
  }
}

export default ForgotPassword;
