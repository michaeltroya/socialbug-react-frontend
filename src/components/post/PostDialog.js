import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
import ToolButton from '../../util/ToolButton';
import LikePostButton from './LikePostButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icon imports
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//Dayjs imports
import dayjs from 'dayjs';
//Redux Imports
import { connect } from 'react-redux';
import { getPost, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadIt,
  profilePic: {
    position: 'relative',
    width: '100%',
    borderRadius: '50%',
    margin: '0 0 1rem 0'
  },
  dialogContent: {
    padding: '1rem !important'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  expandButton: {
    position: 'absolute',
    right: '0',
    bottom: '0'
  },
  spinner: {
    textAlign: 'center'
  }
});

class PostDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
    this.props.getPost(this.props.postId);
  };

  handleClose = () => {
    this.setState({
      open: false
    });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      post: { postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
      UI: { loading }
    } = this.props;

    let likeOrLikes;

    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={200}></CircularProgress>
      </div>
    ) : (
      <Fragment>
        <Grid container spacing={3} direction="row" justify="center" alignItems="center">
          <Grid item sm={5}>
            <img src={userImage} alt="Profile" className={classes.profilePic} />
          </Grid>
          <Grid item sm={7}>
            <Typography component={Link} color="secondary" variant="h5" to={`/users/${userHandle}`}>
              @{userHandle}
            </Typography>
            <hr className={classes.clearSeparator} />
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.clearSeparator} />
            <Typography variant="body1">{body}</Typography>
            <LikePostButton postId={postId} />
            <span>
              {likeCount} {(likeOrLikes = likeCount === 1 ? 'like' : 'likes')}
            </span>
            <ToolButton tip="comments">
              <ChatIcon color="secondary" />
            </ToolButton>
            <span>{commentCount} comments</span>
          </Grid>
        </Grid>

        <CommentForm postId={postId} />
        <Comments comments={comments} />
      </Fragment>
    );
    return (
      <Fragment>
        <ToolButton onClick={this.handleOpen} tip="View details" tipClassName={classes.expandButton}>
          <UnfoldMore />
        </ToolButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
          <ToolButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon />
          </ToolButton>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  getPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
