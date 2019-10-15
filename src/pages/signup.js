import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Icon from '../images/icon.png';
import axios from 'axios';
import { Link } from 'react-router-dom/';
//Material UI imports
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '.6rem 0'
  },
  pageTitle: {
    margin: '.5rem 0'
  },
  textField: {
    margin: '.5rem 0'
  },
  button: {
    margin: '2rem 0',
    position: 'relative'
  },
  progress: {
    position: 'absolute'
  },
  error: {
    color: 'red',
    fontSize: '.8rem',
    marginTop: '1rem'
  }
};
class signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      loading: false,
      errors: {}
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const createUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    axios
      .post('/signup', createUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          errors: err.response.data,
          loading: false
        });
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={Icon} alt="Monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Signup
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.error}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
              Signup {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
            <div className={classes.signup}>
              Already have an account ? <Link to="/login">Login Here</Link>
            </div>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(signup);
