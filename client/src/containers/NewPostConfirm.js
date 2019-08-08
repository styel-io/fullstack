import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPostStandby } from "../actions/post";

import { Grid, Form, Image, TextArea, Input } from "semantic-ui-react";

const NewPostTextForm = ({ addPostStandby, standby }) => {
  const [styel, setStyel] = useState(standby.styel);
  const [text, setText] = useState(standby.text);
  const [location, setLocation] = useState(standby.location);
  const [imageurl, setImageurl] = useState(standby.imageurl);

  return (
    <Form
      className=""
      onSubmit={e => {
        e.preventDefault();
        addPostStandby({ styel, text, location, imageurl });
      }}
    >
      <Grid stackable centered className="NewPostBox">
        <Grid.Column width={10}>
          <Image src={imageurl} />
        </Grid.Column>
        <Grid.Column width={6} className="NewPostBox_input-text">
          <Form.Field
            control={TextArea}
            placeholder="What's happening?"
            name="text"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <Form.Field
            control={Input}
            placeholder="Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
          <Form.Button content="Submit" />
        </Grid.Column>
      </Grid>
    </Form>
  );
};
NewPostTextForm.propTypes = {
  standby: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  standby: state.post.standby
});

export default connect(
  mapStateToProps,
  { addPostStandby }
)(NewPostTextForm);
