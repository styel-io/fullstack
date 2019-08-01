import React, { Component } from "react";
import { load } from "../../actions/auth";
import axios from "axios";


class My_page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      url: ""
    };
  }
  render() {
    return (
      <div>
          test
      </div>
    );
  }
}

export default My_page;
