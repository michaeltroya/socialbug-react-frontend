import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom/';
import ToolButton from '../util/ToolButton';
//Dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//Material UI Imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//Icon imports
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux Imports
import { connect } from 'react-redux';
import { likePost, unlikePost } from '../redux/actions/dataActions';

const styles = {
  card: {
    display: 'flex',
    marginBottom: '2rem'
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: '1rem',
    objectFit: 'cover'
  }
};

export class Post extends Component {
  likedPost = () => {
    if (this.props.user.likes && this.props.user.likes.find(like => like.postId === this.props.post.postId)) {
      return true;
    } else {
      return false;
    }
  };

  likePost = () => {
    this.props.likePost(this.props.post.postId);
  };

  unlikePost = () => {
    this.props.unlikePost(this.props.post.postId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount },
      user: { authenticated }
    } = this.props;

    const likeButton = !authenticated ? (
      <ToolButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </ToolButton>
    ) : this.likedPost() ? (
      <ToolButton tip="Unlike" onClick={this.unlikePost}>
        <FavoriteIcon color="primary" />
      </ToolButton>
    ) : (
      <ToolButton tip="Like" onClick={this.likePost}>
        <FavoriteBorder color="primary" />
      </ToolButton>
    );

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia image={userImage} title="Profile Picutre" className={classes.image} />
          <CardContent className={classes.content}>
            <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
              {userHandle}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            {likeButton}
            <span>{likeCount} Likes</span>
            <ToolButton tip="comments">
              <ChatIcon color="primary " />
            </ToolButton>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { likePost, unlikePost };

Post.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
