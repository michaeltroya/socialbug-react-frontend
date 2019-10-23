import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//Dayjs imports
import dayjs from 'dayjs';
//Icon imports
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = theme => ({
  ...theme.spreadIt
});

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink component={Link} to={`/users/${handle}`} color="secondary" variant="h5">
            {handle}
          </MuiLink>
          <hr />
          {bio && (
            <Typography variant="body" className={classes.whiteText}>
              {bio}
            </Typography>
          )}
          <hr />
          {location && (
            <Fragment>
              {' '}
              <LocationOn className={classes.greyText} />
              <span className={classes.greyText}>{location}</span> <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon className={classes.greyText} />
              <a href={website} target="_blank" rel="noopener noreferrer" className={classes.greyText}>
                {'  '}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday className={classes.greyText} /> <span className={classes.greyText}>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
