import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import { Container, Menu, Icon, Image } from "semantic-ui-react";

import "../styles/navbar.css";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <Fragment>
      {/* <Menu.Item>
        <Link to="/my_post">My Post</Link>
      </Menu.Item> */}

      <Menu.Item>
        <Link to="/newpost">
          <Icon size="big" name="add circle" />
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={`/pf/${user.name}`}>
          <Image src={user.avatar} avatar size="mini" />
        </Link>
      </Menu.Item>
      {/* <Menu.Item>
      <Link to="/upload_file">Upload_file</Link>
    </Menu.Item> */}

      {/* <Menu.Item>
      <Icon size="large" name="ellipsis vertical" />
    </Menu.Item> */}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Menu.Item>
        <Link to="login">
          <Icon name="user circle" size="big" />
        </Link>
      </Menu.Item>
    </Fragment>
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
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
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
