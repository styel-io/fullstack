import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPostStandby } from "../actions/post";

import NewPostUserInfo from "../components/post/NewPostUserInfo";
import "../styles/containers/NewPostBox.css";
import "../styles/components/post/NewPostBoxCaption.css";

import { Grid, Form, Image } from "semantic-ui-react";
import TextField from "@material-ui/core/TextField";

const NewPostStyelForm = ({ addPostStandby, standby, user }) => {
  const [styel] = useState(standby.styel);
  const [text, setText] = useState(standby.text);
  const [location, setLocation] = useState(standby.location);
  const [imageurl] = useState(standby.imageurl);

  return (
    <Form
      className=""
      onClick={e => {
        e.preventDefault();
        addPostStandby({ styel, text, location, imageurl });
      }}
      onMouseOut={e => {
        e.preventDefault();
        addPostStandby({ styel, text, location, imageurl });
      }}
      onKeydown={e => {
        e.preventDefault();
        addPostStandby({ styel, text, location, imageurl });
      }}
    >
      <Grid stackable centered className="NewPostBox">
        <Grid.Column width={10}>
          <Image src={imageurl} />
        </Grid.Column>
        <Grid.Column width={6} className="NewPostBox_input-text">
          <NewPostUserInfo user={user} />

          <Grid className="NewPostBox_caption">
            <TextField
              fullWidth="true"
              rows="4"
              multiline="true"
              placeholder="What's happening?"
              value={text}
              onChange={e => setText(e.target.value)}
              required
              autoFocus
            />
          </Grid>
          <Grid className="NewPostBox_comment-box">
            <TextField
              fullWidth="true"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </Grid>
        </Grid.Column>
      </Grid>
    </Form>
  );
};
NewPostStyelForm.propTypes = {
  standby: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  standby: state.post.standby,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addPostStandby }
)(NewPostStyelForm);
