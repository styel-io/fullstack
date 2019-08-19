import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../actions/post";

import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

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

const Feed = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
