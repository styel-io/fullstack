import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import CommentItem from "../components/post/CommentItem";

// import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { addComment, deletePost } from "../actions/post";
// import "../styles/containers/FeedBox.css";

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

const FeedBox = ({
  post,
  auth: { user, isAuthenticated },
  addComment,
  deletePost
}) => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [text, setText] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const editPost = () => {
    console.log("포스트 수정");
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
          <div>
            <IconButton
              aria-label="settings"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={editPost}>Edit</MenuItem>
              <MenuItem onClick={() => deletePost(post._id)}>Delete</MenuItem>
            </Menu>
          </div>
        }
        title={post.name}
        subheader={moment(post.date).fromNow()}
      />
      <img src={post.imageurl} className={classes.image} alt="styel" />
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p"> */}
        <div dangerouslySetInnerHTML={{ __html: post.text }} />
        {/* </Typography> */}
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
          {isAuthenticated ? (
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
          ) : null}
        </CardContent>
      </Collapse>
    </Card>
  );
};

FeedBox.propTypes = {
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addComment, deletePost }
)(FeedBox);
