import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { makeStyles } from "@material-ui/core/styles";

import { signinAction } from "../../redux/actions/authActions";
import { useSelector, useDispatch } from "react-redux";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="wisermachines.com/">
        wiserMachines
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
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    password: "",
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
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
