import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Gauge from "../../../common/Gauge";
import { pillStyle, colors, transparentPaper } from "../../../../utils/styles";

const headingMargin = {
  marginTop: 8,
};

export default function CardMedium(props) {
  const {
    title,
    gaugeValue,
    gaugeUnit,
    maxTitle,
    minTitle,
    maxValue,
    minValue,
  } = props.data;

  const maxPill = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <Paper style={transparentPaper}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="caption" color="inherit">
                {maxTitle}
              </Typography>
            </Grid>
            <Grid item>
              <Paper style={pillStyle(colors.status.normal)}>
                <Typography variant="body2" color="inherit">
                  {maxValue}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

  const minPill = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
        <Paper style={transparentPaper}>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              <Typography variant="caption" color="inherit">
                {minTitle}
              </Typography>
            </Grid>
            <Grid item>
              <Paper style={pillStyle(colors.status.normal)}>
                <Typography variant="body2" color="inherit">
                  {minValue}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      component={Paper}
      spacing={0}
      elevation={0}
    >
      <Grid item xs={props.pills ? 6 : 12}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item style={headingMargin}>
            <Typography variant="button" color="inherit" align="center">
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Gauge data={{ gaugeValue, gaugeUnit }} />
          </Grid>
        </Grid>
      </Grid>
      {props.pills ? (
        <Grid item xs={6}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            <Grid item xs={12}>
              {maxPill}
              {minPill}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  );
}
