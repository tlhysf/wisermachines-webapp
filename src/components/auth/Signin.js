import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import CircularProgress from "@material-ui/core/CircularProgress";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import { makeStyles } from "@material-ui/core/styles";
import colors from "../../utils/colors";

import { signinAction } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const animationTimeout = 500;

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="wisermachines.com/">
        {"WiserMachines "}
      </Link>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submitLoading: {
    margin: theme.spacing(3, 0, 2),
    height: 36,
    padding: 6,
  },
  failure: {
    marginTop: 20,
    backgroundColor: colors.RED[600],
    color: "white",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    "&:hover": {
      backgroundColor: colors.RED[600],
      color: "white",
    },
  },
  success: {
    marginTop: 20,
    backgroundColor: colors.LIGHTGREEN[400],
    color: "white",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(4),
    "&:hover": {
      backgroundColor: colors.LIGHTGREEN[400],
      color: "white",
    },
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const signinError = useSelector((state) => state.auth.signinError);
  const signinResponse = useSelector((state) => state.auth.signinResponse);
  const signinLoading = useSelector((state) => state.auth.signinLoading);

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "demo",
    password: "demo",
  });

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setErrors({
      name: null,
      password: null,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const errorsObj = {
      name: formData.name === "" ? "Cannot be empty." : null,
      password: formData.password === "" ? "Cannot be empty." : null,
    };

    setErrors(errorsObj);

    if (Object.values(errorsObj).filter((x) => x).length === 0) {
      signinAction(dispatch, formData);
    }
  };

  useEffect(() => {
    if (signinResponse !== null) {
      setTimeout(() => {
        window.location.href = "/";
      }, animationTimeout * 2);
    }
  }, [signinResponse]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {signinError ? (
            <Grow in={true} {...{ timeout: animationTimeout }}>
              <Button
                startIcon={<CancelOutlinedIcon />}
                fullWidth
                className={classes.failure}
                onClick={(e) => e.preventDefault()}
                disableRipple
              >
                <Typography variant="caption">{signinError}</Typography>
              </Button>
            </Grow>
          ) : null}
          {signinResponse ? (
            <Grow in={true} {...{ timeout: animationTimeout }}>
              <Button
                startIcon={<CheckCircleOutlineIcon />}
                fullWidth
                className={classes.success}
                onClick={(e) => e.preventDefault()}
                disableRipple
              >
                <Typography variant="caption">{signinResponse}</Typography>
              </Button>
            </Grow>
          ) : null}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            helperText="Username: demo"
            defaultValue="demo"
            name="name"
            autoComplete="off"
            onChange={(e) => handleFormData(e)}
            color={errors.name ? "secondary" : "primary"}
            placeholder={errors.name}
            focused={true}
            style={{
              marginTop: 20,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            helperText="Password: demo"
            defaultValue="demo"
            label="Password"
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => handleFormData(e)}
            color={errors.password ? "secondary" : "primary"}
            placeholder={errors.password}
            focused={true}
            style={{
              marginTop: 20,
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          {signinLoading ? (
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submitLoading}
              onClick={(e) => e.preventDefault()}
            >
              <CircularProgress color="primary" size={20} />
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSave(e)}
              style={{
                marginTop: 20,
              }}
            >
              Sign In
            </Button>
          )}
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={20}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
