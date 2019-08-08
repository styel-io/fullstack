import React from "react";

import { Image, Grid } from "semantic-ui-react";
import "../../styles/components/post/NewPostUserInfo.css";

const NewPostUserInfo = ({ user }) => {
  return (
    <Grid.Row className="FeedBox_user-info" verticalAlign="top">
      <Grid verticalAlign="middle">
        <Grid.Column width={2}>
          <Image src={user.avatar} avatar size="mini" />
        </Grid.Column>
        <Grid.Column width={14}>
          <h3 className="FeedBox_username">{user.name}</h3>
        </Grid.Column>
      </Grid>
    </Grid.Row>
  );
};

export default NewPostUserInfo;
