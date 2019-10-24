import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom/';
//Material UI imports
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
//Redux Imports
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

const styles = theme => ({
  ...theme.spreadIt,
  loginPaper: {
    backgroundColor: '#444444',
    padding: '3rem'
  },
  loginQuestion: {
    color: 'white',
    '& a': {
      color: theme.palette.secondary.main
    }
  }
});

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Paper className={classes.loginPaper}>
        <Grid container className={classes.form}>
          <Grid item sm></Grid>
          <Grid item sm>
            <Typography variant="h4" className={classes.pageTitle}>
              LOGIN
            </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                className={classes.textField}
                helperText={errors.email}
                error={errors.email ? true : false}
                value={this.state.email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                className={classes.textField}
                helperText={errors.password}
                error={errors.password ? true : false}
                value={this.state.password}
                onChange={this.handleChange}
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.error}>
                  {errors.general}
                </Typography>
              )}
              <Button type="submit" variant="contained" color="secondary" className={classes.button} disabled={loading}>
                Login {loading && <CircularProgress size={30} className={classes.progress} />}
              </Button>
              <div className={classes.loginQuestion}>
                Dont have an account? <br />
                <Link to="/signup">Signup Here</Link>
              </div>
            </form>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </Paper>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
