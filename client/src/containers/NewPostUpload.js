import React, { Component } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";

import { addPostStandby } from "../actions/post";
import { connect } from "react-redux";

class NewPostUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      imageurl: null,
      text: null,
      location: null,
      styel: null
    };
  }

  handleChange = files => {
    console.log(files[0]);
    let file = files[0];
    // Split the filename to get the name and type
    let fileParts = files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    // let randomNum = Math.floor(Math.random() * 11);
    let date = new Date();

    console.log(fileName, fileType);
    console.log("Preparing the upload");
    axios
      .post("/api/controllers/sign_s3", {
        fileName: date.getTime() + "_" + fileName + "." + fileType,
        fileType: fileType
      })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;
        this.setState({ imageurl: url });
        this.props.addPostStandby(this.state);
        console.log("Recieved a signed request " + signedRequest);

        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            "Content-Type": fileType
          }
        };
        axios
          .put(signedRequest, file, options)
          .then(result => {
            console.log("Response from s3");
            this.setState({ success: true });
          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          });
      })
      .catch(error => {
        alert(JSON.stringify(error));
      });
  };

  render() {
    const SuccessMessage = () => (
      <div style={{ padding: 50 }}>
        <h3 style={{ color: "#22b573" }}>SUCCESSFUL UPLOAD</h3>
      </div>
    );
    return (
      <div>
        <div className="NewPostBoard__dropzone" id="NewPost_imagePreview">
          <Dropzone onDrop={acceptedFiles => this.handleChange(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section className="NewPostBoard__dropzone-inner-wrapper">
                <div
                  className="NewPostBoard__dropzone-inner-content"
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <div className="fa fa-camera NewPostBoard__dropzone-icon">
                    <i aria-hidden="true" />
                  </div>
                  {this.state.success ? <SuccessMessage /> : null}
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        <div style={{ textAlign: "center" }} />
      </div>
    );
  }
}

export default connect(
  null,
  { addPostStandby }
)(NewPostUpload);
