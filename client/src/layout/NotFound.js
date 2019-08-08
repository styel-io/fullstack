import React, { Fragment } from "react";
import { Image } from "semantic-ui-react";

const NotFound = () => {
  return (
    <Fragment>
      <Image
        src="https://styel.s3.ap-northeast-2.amazonaws.com/404.png"
        centered
      />
    </Fragment>
  );
};

export default NotFound;
