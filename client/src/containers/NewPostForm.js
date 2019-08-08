import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

import "../styles/NewPost.css";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");

  return (
    <Form
      className="form my-1"
      onSubmit={e => {
        e.preventDefault();
        addPost({ styel, text, location });
        setStyel("");
        setText("");
        setLocation("");
      }}
    >
      <Grid stackable centered className="NewPostBox">
        <Grid.Column width={10}>
          {/* <NewPostImageUpload /> */}이미지 업로드 공간
        </Grid.Column>
        <Grid.Column width={6} className="NewPostForm">
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  standby: state.post.standby
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
