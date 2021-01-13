import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import colors from "../../utils/colors";

const errorScreenStyles = {
  root: {
    padding: 30,
  },
  textContainer: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  image: {
    height: "50vh",
    padding: 10,
  },
  heading: {
    color: colors.BLUEGREY[700],
  },
  text: {
    color: colors.BLUEGREY[800],
  },
  buttonContainer: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  button: {
    color: colors.TEAL[800],
  },
};

export default function UnderConstruction() {
  const handleGoBackButton = () => {
    window.history.go(-1);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={errorScreenStyles.root}
    >
      <Grid>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          component={Paper}
          elevation={2}
          spacing={4}
        >
          <Grid item>
            <img
              src="img/underConstruction.jpg"
              alt={"under construction"}
              style={errorScreenStyles.image}
            ></img>
          </Grid>
          <Grid item md={6}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="flex-start"
              style={errorScreenStyles.textContainer}
              spacing={4}
            >
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  paragraph
                  style={errorScreenStyles.heading}
                >
                  {"This feature is currently under construction."}
                </Typography>
                <Typography variant="caption" style={errorScreenStyles.text}>
                  {"You are here a little early."}
                </Typography>
              </Grid>
              <Grid item xs={12} style={errorScreenStyles.buttonContainer}>
                <Button
                  variant="outlined"
                  fullWidth
                  style={errorScreenStyles.button}
                  onClick={(e) => handleGoBackButton()}
                >
                  <Typography variant="caption">{"Go back"}</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
