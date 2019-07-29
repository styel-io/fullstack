import React, { Fragment } from "react";
import { Container, Menu, Icon, Image, Grid, Segment } from "semantic-ui-react";

const Main = () => {
  return (
    <article>
      <Fragment>
        <div>
          <div className="feedBox">
            <div className="feedImage">
              <Image src="https://elasticbeanstalk-us-east-1-316780406076.s3.amazonaws.com/4efdd2f969559e8b1c92e99f32ded48e130435.png" />
            </div>
            <div className="feedContent">
              <div>info</div>
            </div>
          </div>
          <div className="feedSpace" />
        </div>

        <div>
          <div className="feedBox">
            <div className="feedImage">
              <Image src="https://elasticbeanstalk-us-east-1-316780406076.s3.amazonaws.com/3fb5ed13afe8714a7e5d13ee506003dd175210.png" />
            </div>

            <div className="feedContent">
              <div>info</div>
            </div>
          </div>
          <div className="feedSpace" />
        </div>

        <div>
          <div className="feedBox">
            <div className="feedImage">
              <Image src="https://elasticbeanstalk-us-east-1-316780406076.s3.amazonaws.com/84e3341f7bc8e1ad7daf229537eae2c0160207.png" />
            </div>
            <div className="feedContent">
              <div>info</div>
            </div>
          </div>
          <div className="feedSpace" />
        </div>
      </Fragment>
    </article>
  );
};

export default Main;
