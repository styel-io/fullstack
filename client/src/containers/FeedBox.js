import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Grid } from "semantic-ui-react";
import "../styles/containers/FeedBox.css";

import FeedBoxUserInfo from "../components/feedbox/FeedboxUserInfo";
import FeedBoxActionBox from "../components/feedbox/FeedBoxActionBox";
import FeedBoxImageContainer from "../components/feedbox/FeedBoxImageContainer";
import FeedBoxCaption from "../components/feedbox/FeedBoxCaption";

const FeedBox = ({ post }) => {
  return (
    <Fragment>
      <Grid stackable centered className="feedBox">
        <FeedBoxImageContainer post={post} />
        <Grid.Column width={6} className="FeedBox_info-container">
          <FeedBoxUserInfo post={post} />
          <FeedBoxCaption post={post} />
          <FeedBoxActionBox />
        </Grid.Column>
      </Grid>
      <Grid className="feedSpace " />
    </Fragment>
  );
};

FeedBox.propTypes = { post: PropTypes.object.isRequired };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(FeedBox);
