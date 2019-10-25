import React from 'react';
import NoImg from '../images/no-img.png';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//Material UI Imports
import Paper from '@material-ui/core/Paper';
//Icon imports
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
  ...theme.spreadIt,
  handle: {
    height: 20,
    width: 60,
    backgroundColor: theme.palette.secondary.main,
    margin: '0 auto 1rem'
  }
});
const ProfileSkeleton = props => {
  const { classes } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="Profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn className={classes.greyText} /> <span className={classes.greyText}>Location</span>
          <hr />
          <LinkIcon className={classes.greyText} /> <span className={classes.greyText}>https://website.com</span>
          <hr />
          <CalendarToday className={classes.greyText} /> <span className={classes.greyText}>Joined date</span>
        </div>
      </div>
    </Paper>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
