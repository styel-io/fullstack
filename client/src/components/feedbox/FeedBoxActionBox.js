import React from "react";

import { Input, Grid, Icon } from "semantic-ui-react";
import "../../styles/components/feedbox/FeedBoxActionBox.css";

const FeedBoxActionBox = props => {
  return (
    <Grid.Row className="FeedBox_action-box" verticalAlign="bottom">
      <Grid>
        <Grid.Row>
          <Grid verticalAlign="middle" className="FeedBox_like-box">
            <Grid.Column width={2}>
              <Icon name="heart outline" size="large" />
            </Grid.Column>
            <Grid.Column width={13}>
              <Icon name="share alternate" size="large" />
            </Grid.Column>
            <Grid.Column width={1}>
              <Icon name="bookmark outline" size="large" />
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          <Input
            transparent
            placeholder="Add a comment"
            className="FeedBox_comment-box"
          />
        </Grid.Row>
      </Grid>
    </Grid.Row>
  );
};

export default FeedBoxActionBox;
