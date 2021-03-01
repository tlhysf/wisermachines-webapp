import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { layoutStyle } from "../../../../../utils/styles";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const Header = (props) => {
  const classes = useStyles();

  const { heading, logo, filename, to, from, thresholds } = props.data;

  const renderRowText = (text, value) => (
    <div>
      <Typography variant="body2" display="inline">
        {text}
      </Typography>
      <Typography variant="subtitle2" display="inline">
        {value}
      </Typography>
    </div>
  );

  return (
    <Grid
      container
      justify="space-between"
      alignItems="flex-start"
      style={{ padding: 20 }}
    >
      <Grid item xs={11}>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Typography variant="h5">{heading}</Typography>
          </Grid>
          <Grid item xs={12}>
            {renderRowText("File Name: ", filename)}
          </Grid>
          <Grid item xs={12}>
            {renderRowText("From: ", from)}
          </Grid>
          <Grid item xs={12}>
            {renderRowText("To: ", to)}
          </Grid>
          <Grid item xs={12}>
            {renderRowText(
              "Temperature Thresholds: ",
              thresholds.temperature.min + " - " + thresholds.temperature.max
            )}
          </Grid>
          <Grid item xs={12}>
            {renderRowText(
              "Humidity Thresholds: ",
              thresholds.humidity.min + " - " + thresholds.humidity.max
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={1}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt="logo" className={classes.logo} />
      </Grid>
    </Grid>
  );
};

export default Header;
