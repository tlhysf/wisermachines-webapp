import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Gauge from "../../../../common/Gauge";

import colors from "../../../../../utils/colors";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const colorSets = {
  high: colors.RED[700],
  normal: colors.INDIGO[700],
  low: colors.GREEN[700],
};

const getColor = (change, thresholds, colorSet) => {
  return change >= thresholds.high
    ? colorSet.high
    : change >= thresholds.low
    ? colorSet.normal
    : change < thresholds.low
    ? colorSet.low
    : colorSet.low;
};

const iconStyle = { height: 15, paddingTop: 5 };

export default function CardMedium(props) {
  const {
    title,
    gaugeValue,
    gaugeUnit,
    thresholds,
    maxTitle,
    maxValue,
    minTitle,
    minValue,
  } = props.data;

  const gaugeItem1 = {
    value: gaugeValue,
    suffix: gaugeUnit,
    thresholds: thresholds,
  };

  const minMaxRender = (title, value, color, icon) => (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <Grid item xs={12}>
        <Typography
          variant="caption"
          style={{ color: colors.BLUEGREY[600] }}
          align="left"
        >
          {title}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Typography variant="body2" align="left" style={{ color: color }}>
              {value}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body2" align="left" style={{ color: color }}>
              {icon}
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
      style={{ paddingTop: 10 }}
    >
      <Grid item xs={7}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography
              variant="body2"
              style={{ color: colors.BLUEGREY[600] }}
              align="center"
            >
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Gauge item1={gaugeItem1} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={5}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={2}
          style={{ paddingLeft: 15, paddingTop: 15 }}
        >
          <Grid item xs={12}>
            {minMaxRender(
              maxTitle,
              maxValue,
              getColor(maxValue, thresholds, colorSets),
              <ArrowUpwardIcon style={iconStyle} />
            )}
          </Grid>
          <Grid item xs={12}>
            {minMaxRender(
              minTitle,
              minValue,
              getColor(minValue, thresholds, colorSets),
              <ArrowDownwardIcon style={iconStyle} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
