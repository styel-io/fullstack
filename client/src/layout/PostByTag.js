import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostByTag } from "../actions/post";

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

const PostByTag = ({ getPostByTag, match, post: { posts, loading } }) => {
  const tag_name = match.params.tag_name;
  console.log(tag_name);
  useEffect(() => {
    getPostByTag(tag_name);
  }, [getPostByTag]);

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

PostByTag.propTypes = {
  getPostByTag: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostByTag }
)(PostByTag);
