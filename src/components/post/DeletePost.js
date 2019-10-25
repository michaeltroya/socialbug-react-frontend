import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ToolButton from '../../util/ToolButton';
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
//Icon imports
import DeleteOutline from '@material-ui/icons/DeleteOutline';
//Redux imports
import { connect } from 'react-redux';
import { deletePost } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...styles.spreadIt,
  deleteButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  dialogTitle: {
    backgroundColor: theme.palette.secondary.main
  },
  dialogActions: {
    backgroundColor: theme.palette.secondary.main
  }
});

class DeletePost extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({
      open: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ToolButton tip="Delete post" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
          <DeleteOutline color="primary" />
        </ToolButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle className={classes.dialogTitle}>Are you sure you would like to delete this post?</DialogTitle>
          <DialogActions className={classes.dialogActions}>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeletePost.propTypes = {
  classes: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deletePost }
)(withStyles(styles)(DeletePost));
