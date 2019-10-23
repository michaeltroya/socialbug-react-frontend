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
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
//Icon imports
import ChatIcon from '@material-ui/icons/Chat';
//Redux Imports
import { connect } from 'react-redux';

const styles = theme => ({
  ...theme.spreadIt,
  leftProfilePic: {
    position: 'relative',
    width: '100%',
    borderRadius: '50%'
  },
  postBody: {
    color: '#fff',
    margin: '.6rem 0'
  }
});

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
    const commentOrComments = commentCount === 1 ? 'comment' : 'comments';

    const deleteButton = authenticated && userHandle === handle ? <DeletePost postId={postId} /> : null;

    return (
      <div>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Grid container spacing={3} direction="row" justify="center" alignItems="center">
              <Grid item xs={3}>
                <img src={userImage} alt="" className={classes.leftProfilePic} />
              </Grid>{' '}
              <Grid item xs={9}>
                <Typography variant="h5" color="secondary" component={Link} to={`/users/${userHandle}`}>
                  {userHandle}
                </Typography>
                {deleteButton}
                <Typography variant="body2" className={classes.greyText}>
                  {dayjs(createdAt).fromNow()}
                </Typography>
                <Typography variant="body1" className={classes.postBody}>
                  {body}
                </Typography>
                <LikePostButton postId={postId} />
                <span className={classes.whiteText}>
                  {likeCount} {likeOrLikes}
                </span>
                <ToolButton tip="comments">
                  <ChatIcon color="secondary" />
                </ToolButton>
                <span className={classes.whiteText}>
                  {commentCount} {commentOrComments}
                </span>
                <PostDialog postId={postId} userHandle={userHandle} openDialog={this.props.openDialog} />
              </Grid>
            </Grid>
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
