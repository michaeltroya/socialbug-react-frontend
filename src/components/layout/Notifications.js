import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/';
//Material UI Imports
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//Icon imports
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
//Dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//Redux Imports
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
  state = {
    anchorEl: null
  };

  handleOpen = e => {
    this.setState({ anchorEl: e.target });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications.filter(not => !not.read).map(not => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };

  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter(notification => notification.read === false).length > 0
        ? (notificationIcon = (
            <Badge badgeContent={notifications.filter(notification => notification.read === false).length} color="secondary">
              <NotificationsIcon color="secondary" />
            </Badge>
          ))
        : (notificationIcon = <NotificationsIcon color="secondary" />);
    } else {
      notificationIcon = <NotificationsIcon color="secondary" />;
    }

    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map(not => {
          const verb = not.type === 'like' ? 'liked' : 'commented on';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon =
            not.type === 'like' ? (
              <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
            ) : (
              <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
            );

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              {icon}
              <Typography component={Link} color="default" variant="body1" to={`/users/${not.recipient}/post/${not.postId}`}>
                {not.sender} {verb} your post {time} ago
              </Typography>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>You have no notifications at the moment</MenuItem>
      );

    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true" onClick={this.handleOpen}>
            {notificationIcon}
          </IconButton>
        </Tooltip>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.user.notifications
});

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);
