import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { check } from "../../actions/auth";
import Alert from "../layout/Alert";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Menu
} from "semantic-ui-react";

const Check_pass = ({
  auth: { user },
  check,
  isAuthenticated,
  url
}) => {
  const [formData, setFormData] = useState({
    password: "",
    email: user.email
  });

  const { password, email } = formData;


  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    check(password, email);
  };

  const checkPass = (
    <Form size="large" onSubmit={e => onSubmit(e)}>
      <Segment>
        <Form.Input
          fluid
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
        <Form.Input
          type="hidden"
          name="email"
          value={user.email}
        />
        <Button color="teal" fluid size="large" type="submit">
          Password Certify
              </Button>
      </Segment>
    </Form>
  );

  const updateForm = (
    <Form>
      <Segment>
        <Form.Input
          fluid
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={e => onChange(e)}
        />
      </Segment>
    </Form>
  );



  // 로그인이 안된 경우 리다이렉트
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 350 }} className="signform">
          <Header as="h2" color="teal" textAlign="center">
            STYEL
          </Header>
          <Menu.Item>
            {/* {user.url ? checkPass} */}
            {user.url? updateForm : checkPass}
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
