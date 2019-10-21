import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
import ToolButton from '../util/ToolButton';
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
    marginBottom: '1rem'
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

    const dialogMarkup = loading ? (
      <CircularProgress size={200}></CircularProgress>
    ) : (
      <Grid container spacing={16}>
        <Grid item sm={12}>
          <img src={userImage} alt="Profile" className={classes.profilePic} />
        </Grid>
        <Grid item sm={12}>
          <Typography component={Link} color="secondary" variant="h5" to={`/users/${userHandle}`}>
            @{userHandle}
          </Typography>
          <hr className={classes.inSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.inSeparator} />
          <Typography variant="body1">{body}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <ToolButton onClick={this.handleOpen} tip="Expand post" tipClassName={classes.expandButton}>
          <UnfoldMore />
        </ToolButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle></DialogTitle>
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
