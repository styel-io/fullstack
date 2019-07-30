import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Divider
} from "semantic-ui-react";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    role: ""
  });

  const { name, email, password, password2, role } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "negative");
    } else {
      register({ name, email, password, role });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment clssName="signform">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 350 }} className="signform">
          <Header as="h2" color="teal" textAlign="center">
            STYEL
          </Header>

          <Form size="large" onSubmit={e => onSubmit(e)}>
            <Segment>
              <Form.Input
                fluid
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
              />

              <Form.Input
                size="large"
                fluid
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
              <Divider clearing />
              <Form.Input
                size="large"
                fluid
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={e => onChange(e)}
              />
              <Form.Input
                size="large"
                fluid
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={e => onChange(e)}
              />
              <Form.Input
                size="large"
                fluid
                type="text"
                placeholder="role test"
                name="role"
                value={role}
                onChange={e => onChange(e)}
              />
              <Button size="large" color="teal" fluid type="submit">
                Register
              </Button>
            </Segment>
          </Form>
          <Alert />
          <Message>
            Already have an account? <Link to="/login">&nbsp;Sign In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
