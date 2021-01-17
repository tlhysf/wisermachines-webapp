import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import Card from "../../../common/Card";

import SpeedIcon from "@material-ui/icons/Speed";
import OpacityIcon from "@material-ui/icons/Opacity";

import colors from "../../../../utils/colors";

const animationDuration = 500;

const getColor = (alert) => {
  if (alert === -1) {
    return colors.CYAN[600];
  } else if (alert === 1) {
    return colors.ORANGE[600];
  } else {
    return colors.GREEN[600];
  }
};

export default function Cards(props) {
  const {
    lastUpdateTimestamp,
    temperatureNow,
    temperatureAlertNow,
    humidityNow,
    humidityAlertNow,
  } = props.data;

  const temperatureNowCard = {
    icon: (
      <SpeedIcon
        size="small"
        style={{ color: getColor(temperatureAlertNow), height: 40 }}
      />
    ),
    values: {
      primary: temperatureNow + "\u00B0C",
      secondary: lastUpdateTimestamp,
      color: getColor(temperatureAlertNow),
      colored: "primary",
    },
  };

  const humidityNowCard = {
    icon: (
      <OpacityIcon
        size="small"
        style={{ color: getColor(humidityAlertNow), height: 40 }}
      />
    ),
    values: {
      primary: humidityNow + " %RH",
      secondary: lastUpdateTimestamp,
      color: getColor(humidityAlertNow),
      colored: "primary",
    },
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grow
        in={true}
        {...{ timeout: animationDuration + 0 * animationDuration }}
      >
        <Grid item md={6} xs={12}>
          <Card data={temperatureNowCard} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Grid item md={6} xs={12}>
          <Card data={humidityNowCard} />
        </Grid>
      </Grow>
    </Grid>
  );
}
