import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

// import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { width } from "@material-ui/system";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

import { addComment } from "../actions/post";
// import "../styles/containers/FeedBox.css";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#cedfd6;"
  },
  barColorPrimary: {
    backgroundColor: "#22b573;"
  }
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 540,
    marginBottom: theme.spacing(4)
  },
  media: {
    height: 0,
    padding: "100%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {},
  image: {
    maxWidth: "560px",
    width: "100%"
  }
}));

const FeedBox = ({ post, addComment }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const [text, setText] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={post.avatar}
            className={classes.avatar}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.name}
        subheader={moment(post.date).fromNow()}
      />
      <img src={post.imageurl} className={classes.image} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          <div dangerouslySetInnerHTML={{ __html: post.text }} />
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div>
            {post.comments.map(comment => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addComment(post._id, { text });
              setText("");
            }}
          >
            <TextField
              id="standard-name"
              autoFocus
              fullWidth
              placeholder="Comment"
              className={classes.textField}
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </form>
        </CardContent>
      </Collapse>
    </Card>
  );
};

FeedBox.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { addComment }
)(FeedBox);
