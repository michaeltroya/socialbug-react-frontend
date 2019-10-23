import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ToolButton from '../../util/ToolButton';
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
//icon imports
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//Redux Imports
import { connect } from 'react-redux';
import { createPost, clearErrors } from '../../redux/actions/dataActions';

const styles = theme => ({
  ...theme.spreadIt,
  submitButton: {
    position: 'relative',
    margin: '1rem 0',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0
  },
  dialogBg: {
    backgroundColor: '#444444',
    color: '#fff'
  }
});

class CreatePost extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', errors: {}, open: false });
    }
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {}
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.createPost({ body: this.state.body });
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
      <Fragment>
        <ToolButton tip="Create a post" onClick={this.handleOpen}>
          <AddIcon color="secondary" />
        </ToolButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <ToolButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
            <CloseIcon />
          </ToolButton>
          <DialogTitle className={classes.dialogBg}>Create a new post</DialogTitle>
          <DialogContent className={classes.dialogBg}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Post"
                multiline
                rows="3"
                placeholder="Post whats on your mind"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button type="submit" variant="contained" color="secondary" className={classes.submitButton} disabled={loading}>
                Submit
                {loading && <CircularProgress size={30} className={classes.progressSpinner} />}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
CreatePost.propTypes = {
  UI: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { createPost, clearErrors }
)(withStyles(styles)(CreatePost));
