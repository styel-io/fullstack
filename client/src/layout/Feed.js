import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import GridList from "@material-ui/core/GridList";

// containers
import FeedBox from "../containers/FeedBox";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#cedfd6;"
  },
  barColorPrimary: {
    backgroundColor: "#22b573;"
  }
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(2),
    width: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  buttonPrimary: {
    margin: theme.spacing(1),
    marginTop: "2rem",
    marginBottom: "1rem",
    color: "#22b573",
    borderColor: "#22b573"
  },
  label: {
    color: "#22b573"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

const Feed = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const classes = useStyles();

  return loading === null ? (
    <ColorLinearProgress />
  ) : (
    <Fragment>
      <div>
        {posts.map(post => (
          <FeedBox key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Feed);
