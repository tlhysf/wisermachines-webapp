import React from "react";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { layoutStyle } from "../../../../../utils/styles";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const Header = (props) => {
  const classes = useStyles();

  const { heading, logo, filename, to, from, thresholds } = props.data;

  const renderRowText = (text) => (
    <Typography variant="body1">{text}</Typography>
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
            {renderRowText("File Name: " + filename)}
          </Grid>
          <Grid item xs={12}>
            {renderRowText("From: " + from)}
          </Grid>
          {renderRowText("To: " + to)}
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
