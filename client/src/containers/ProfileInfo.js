import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import { getPostById } from "../actions/post";
import { logout } from "../actions/auth";

import ProfileAvatar from "../components/profile/ProfileAvatar";
import ProfileStatus from "../components/profile/ProfileStatus";
import ProfileDetail from "../components/profile/ProfileDetail";

import "../styles/containers/ProfileInfo.css";

import FeedBox from "../containers/FeedBox";

const ProfileInfo = ({
  getPostById,
  logout,
  auth: { user },
  post: { posts, loading }
}) => {
  useEffect(() => {
    getPostById(user._id);
  }, [getPostById]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Grid container spacing={2} style={{ maxWidth: "780px" }}>
        <Grid item xs={6}>
          <ProfileAvatar />
        </Grid>
        <Grid item xs={6}>
          <h3 className="Profile__username">{user.name}</h3>

          <span>
            <IconButton
              aria-label="settings"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <Link to="/Check_pass">Edit Profile</Link>
              </MenuItem>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </span>
          <ProfileStatus />
          <ProfileDetail />
        </Grid>
      </Grid>
      <br />
      <div>
        {posts.map(post => (
          <FeedBox key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

ProfileInfo.propTypes = {
  getPostById: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostById, logout }
)(ProfileInfo);
