import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

// material-ui
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import Icon from "@material-ui/core/Icon";

// use material-ui style
const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    },
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  avatar: {
    margin: 10
  },
  button: {
    margin: theme.spacing(1)
  },
  avatar: {
    margin: 10
  }
}));

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const classes = useStyles();

  const authLinks = (
    <Fragment>
      <Link to="/newpost">
        <IconButton className={classes.button}>
          <i class="material-icons md-36">add_circle_outline</i>
        </IconButton>
      </Link>
      <Link to={`/pf/${user.name}`}>
        <Avatar src={user.avatar} avatar size="mini" />
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Link to="/login">
      <IconButton className={classes.button}>
        <i class="fas fa-user-alt" />
      </IconButton>
    </Link>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="white"
          className={classes.appBar}
          elevation={0}
        >
          <Toolbar>
            <Link to="/">
              <img
                alt="STYEL"
                src="https://styel.s3.ap-northeast-2.amazonaws.com/styel_42x42.png"
              />
            </Link>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
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
