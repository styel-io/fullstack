import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import moment from "moment";
import { deleteComment } from "../../actions/post";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

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

      {moment(date).fromNow()}
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
