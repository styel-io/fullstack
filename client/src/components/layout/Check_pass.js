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
  Segment
} from "semantic-ui-react";

const Check_pass = ({ check, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    password: ""
  });

  const { password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    check(password);
  };

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
              <Button color="teal" fluid size="large" type="submit">
                Password Certify
              </Button>
            </Segment>
          </Form>
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
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { check }
)(Check_pass);
