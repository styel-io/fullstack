import React from "react";
import PropTypes from "prop-types";

import { Grid } from "semantic-ui-react";
import "../../styles/components/feedbox/FeedBoxCaption.css";

const FeedBoxCaption = ({
  post: { _id, text, name, avatar, user, likes, comments, date }
}) => {
  return (
    <Grid.Row>
      <Grid className="FeedBox_caption">
        <Grid.Row>
          {/* <div>{text}</div> */}
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </Grid.Row>
        {/* <Grid.Row className="FeedBox__comments">
          코멘트 박스 리드 생성
          {post.comments.slice(0, 4).map(comment => (
                  <div key={comment.id} className="PostModal__comment-item">
                    <strong>{comment.username}</strong> {comment.body}
                  </div>
                ))} 
        </Grid.Row> */}
      </Grid>
    </Grid.Row>
  );
};

FeedBoxCaption.propTypes = {
  post: PropTypes.object.isRequired
};

export default FeedBoxCaption;

