import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
//Material UI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//Dayjs imports
import dayjs from 'dayjs';

const styles = theme => ({
  ...theme.spreadIt,
  commentImage: {
    width: '100%',
    borderRadius: '50%'
  }
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userHandle, userImage } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid container spacing={3} direction="row" justify="center" alignItems="center">
                <Grid item sm={2}>
                  <img src={userImage} alt="Profile" className={classes.commentImage} />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="secondary">
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="text-secondary" className={classes.greyText}>
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.clearSeparator} />
                    <Typography variant="body1" className={classes.whiteText}>
                      {body}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && <hr className={classes.separator} />}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
