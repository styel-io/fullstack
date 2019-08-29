import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";
import { getPostByTag } from "../actions/post";

// material-ui
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import InputBase from "@material-ui/core/InputBase";

import SearchIcon from "@material-ui/icons/Search";

import Avatar from "@material-ui/core/Avatar";

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
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginLeft: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(2),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Navbar = ({
  getPostByTag,
  auth: { isAuthenticated, loading, user },
  logout
}) => {
  const classes = useStyles();

  const [searchTag, setSearchTag] = useState("");

  const authLinks = (
    <Fragment>
      <IconButton
        component={AdapterLink}
        to="/newpost"
        className={classes.button}
      >
        <i className="fas fa-plus" />
      </IconButton>

      <Link to={`/pf/${user.name}`}>
        <Avatar src={user.avatar} avatar="true" size="mini" />
      </Link>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to="/login">
        <IconButton className={classes.button}>
          <i className="fas fa-user-alt" />
        </IconButton>
      </Link>
    </Fragment>
  );

  const handleClick = () => {
    console.log("핸들클릭");
    console.log(searchTag);
    getPostByTag(searchTag);
    document.getElementById("inputSearch").value = "";
    // getPostByTag(searchTag);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar
          position="fixed"
          color="inherit"
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
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                id="inputSearch"
                inputProps={{ "aria-label": "search" }}
                onChange={e => setSearchTag(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
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
  getPostByTag: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout, getPostByTag }
)(Navbar);
