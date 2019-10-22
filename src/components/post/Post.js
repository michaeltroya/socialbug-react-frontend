import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom/';
import ToolButton from '../../util/ToolButton';
import DeletePost from './DeletePost';
import PostDialog from './PostDialog';
import LikePostButton from './LikePostButton';
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
//Redux Imports
import { connect } from 'react-redux';

const styles = {
  card: {
    position: 'relative',
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
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const likeOrLikes = likeCount === 1 ? 'like' : 'likes';

    const deleteButton = authenticated && userHandle === handle ? <DeletePost postId={postId} /> : null;

    return (
      <div>
        <Card className={classes.card}>
          <CardMedia image={userImage} title="Profile Picture" className={classes.image} />
          <CardContent className={classes.content}>
            <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}>
              {userHandle}
            </Typography>
            {deleteButton}
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body1">{body}</Typography>
            <LikePostButton postId={postId} />
            <span>
              {likeCount} {likeOrLikes}
            </span>
            <ToolButton tip="comments">
              <ChatIcon color="secondary" />
            </ToolButton>
            <span>{commentCount} comments</span>
            <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

Post.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

export default connect(mapStateToProps)(withStyles(styles)(Post));
