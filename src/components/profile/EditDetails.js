import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ToolButton from '../../util/ToolButton';
//Material UI Imports
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Icon imports
import EditIcon from '@material-ui/icons/Edit';
//Redux Imports
import { connect } from 'react-redux';
import { editUserDetails } from '../../redux/actions/userActions';

const styles = theme => ({
  ...theme.spreadIt,
  button: {
    float: 'right'
  },
  submitButton: {
    margin: '1rem 0'
  }
});

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  componentDidMount = () => {
    const credentials = this.props;
    this.setDetailsToState(credentials);
  };
  setDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
    this.setDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <ToolButton tip="Edit details" onClick={this.handleOpen} btnClassName={classes.button}>
          <EditIcon color="primary" />
        </ToolButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
          <DialogTitle className={classes.dialogBg}>Edit your details</DialogTitle>
          <DialogContent className={classes.dialogBg}>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="Tell everyone about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="Share your website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Share your location"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions className={classes.dialogBg}>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="secondary" className={classes.submitButton}>
              Save changes
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles(styles)(EditDetails));
