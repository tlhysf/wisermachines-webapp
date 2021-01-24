import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import Card from "./Card";
import LastUpdatedCard from "../../../common/LastUpdatedCard";

import SpeedIcon from "@material-ui/icons/Speed";
import OpacityIcon from "@material-ui/icons/Opacity";

import colors from "../../../../utils/colors";

const animationDuration = 200;

const getColor = (alert) => {
  if (alert === -1) {
    return colors.BLUE[700];
  } else if (alert === 1) {
    return colors.RED[700];
  } else {
    return colors.GREEN[700];
  }
};

const getStatus = (alert) => {
  if (alert === -1) {
    return "Low";
  } else if (alert === 1) {
    return "High";
  } else {
    return "Normal";
  }
};

export default function Cards(props) {
  const {
    lastUpdateTimestamp,
    temperatureNow,
    temperatureAlertNow,
    humidityNow,
    humidityAlertNow,
    liveData,
  } = props.data;

  const lastUpdatedCard = {
    lastUpdateTimestamp,
    liveData,
  };

  const iconHeight = 60;

  const temperatureNowCard = {
    icon: (
      <SpeedIcon
        size="small"
        style={{ color: getColor(temperatureAlertNow), iconHeight }}
      />
    ),
    values: {
      primary: temperatureNow + " \u00B0C",
      secondary: getStatus(temperatureAlertNow),
      color: getColor(temperatureAlertNow),
      colored: "primary",
    },
  };

  const humidityNowCard = {
    icon: (
      <OpacityIcon
        size="small"
        style={{ color: getColor(humidityAlertNow), iconHeight }}
      />
    ),
    values: {
      primary: humidityNow + " %RH",
      secondary: getStatus(humidityAlertNow),
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
        <Grid item md={4} xs={12}>
          <LastUpdatedCard data={lastUpdatedCard} />
        </Grid>
      </Grow>

      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Grid item md={4} xs={12}>
          <Card data={temperatureNowCard} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 2 * animationDuration }}
      >
        <Grid item md={4} xs={12}>
          <Card data={humidityNowCard} />
        </Grid>
      </Grow>
    </Grid>
  );
}
