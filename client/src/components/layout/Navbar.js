import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Container, Menu, Icon, Image } from "semantic-ui-react";

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
      <Link to="/upload_file">Upload_file {"   "}</Link>
      <Link to="/load_file">Load_file {"   "}</Link>
      <Link to="login">
        <Icon name="user circle" size="big" />
      </Link>
    </div>
  );
  return (
    <Fragment>
      <Menu fixed="top" borderless>
        <Container>
          <Menu.Item>
            <Link to="/">
              <Image src="https://styel.s3.ap-northeast-2.amazonaws.com/styel_42x42.png" />
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
