import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container, Menu, Icon, Grid } from "semantic-ui-react";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Link onClick={logout} to="/">
      <span className="hide-sm"> Logout</span>
    </Link>
  );

  const guestLinks = (
    <div>
      {/* <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="register">Register</Link>
      </li> */}

      <Link to="login">
        <Icon name="user circle" size="big" />
      </Link>
    </div>
  );
  return (
    <Fragment>
      <Menu fixed="top" borderless secondary header>
        <Container>
          <Menu.Item>
            <Link to="/">
              {/* <Icon name="angle up" size="large" /> */}
              <h2>STYEL</h2>
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>

      <div className="headerSpace" />
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
