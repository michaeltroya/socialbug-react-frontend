import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
import ToolButton from '../util/ToolButton';
import LikePostButton from './LikePostButton';
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icon imports
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//Dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//Redux Imports
import { connect } from 'react-redux';
import { getPost } from '../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadIt,
  inSeparator: {
    border: 'none',
    margin: '4'
  },
  profilePic: {
    position: 'relative',
    width: '100%',
    borderRadius: '50%'
  },
  dialogContent: {
    padding: '1rem'
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
  };

  render() {
    const {
      classes,
      post: { postId, body, createdAt, likeCount, commentCount, userImage, userHandle },
      UI: { loading }
    } = this.props;

    let likeOrLikes;

    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={200}></CircularProgress>
      </div>
    ) : (
      <Grid container spacing={3} direction="row" justify="center" alignItems="center">
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profilePic} />
        </Grid>
        <Grid item sm={7}>
          <Typography component={Link} color="secondary" variant="h5" to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <hr className={classes.inSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.inSeparator} />
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
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
