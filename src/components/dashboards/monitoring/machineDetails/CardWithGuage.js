import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Gauge from "../../../common/Gauge";

export default function CardMedium(props) {
  const {
    title,
    gaugeValue,
    gaugeUnit,
    gaugeColor,
    maxTitle,
    maxValue,
    maxColor,
    maxIcon,
    minTitle,
    minValue,
    minColor,
    minIcon,
  } = props.data;

  const minMaxRender = (title, value, color, icon) => (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="caption" color="inherit" align="center">
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {icon ? (
            <Grid item xs={2}>
              <Typography
                variant="body2"
                align="center"
                style={{ color: color }}
              >
                {icon}
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={icon ? 10 : 12}>
            <Typography variant="body2" align="center" style={{ color: color }}>
              {value}
            </Typography>
          </Grid>
        </Grid>
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
      elevation={2}
      style={{ padding: 5 }}
    >
      <Grid item xs={6}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="overline" color="inherit" align="center">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Gauge data={{ gaugeValue, gaugeUnit, gaugeColor }} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12}>
            {minMaxRender(maxTitle, maxValue, maxColor, maxIcon)}
          </Grid>
          <Grid item xs={12}>
            {minMaxRender(minTitle, minValue, minColor, minIcon)}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
