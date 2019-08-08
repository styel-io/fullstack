import React from "react";
import { Image, Grid } from "semantic-ui-react";

function FeedBoxImageContainer({
  post: { _id, text, name, avatar, user, likes, comments, date, imageurl }
}) {
  return (
    <Grid.Column
      width={10}
      className="feedBox_image-container"
      verticalAlign="top"
    >
      <Image src={imageurl} centered />
    </Grid.Column>
  );
}

FeedBoxImageContainer.propTypes = {};

export default FeedBoxImageContainer;
