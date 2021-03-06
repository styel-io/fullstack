import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { deleteComment } from "../../actions/post";

import IconButton from "@material-ui/core/IconButton";
// import Avatar from "@material-ui/core/Avatar";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div>
    <div>
      <Link to={`/profile/${user}`}>
        {/* <Avatar src={avatar} /> */}
        {name}
      </Link>
      <span>&nbsp;</span>
      <span style={{ color: "gray" }}>{moment(date).fromNow()}</span>
      <span>&nbsp;</span>
      {text}
      {!auth.loading && user === auth.user._id && (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => deleteComment(postId, _id)}
        >
          <i className="material-icons">clear</i>
        </IconButton>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
