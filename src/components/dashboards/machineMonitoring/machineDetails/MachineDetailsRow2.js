import React from "react";
import Grid from "@material-ui/core/Grid";
import CardWithGauge from "./cards/CardWithGauge";
import Grow from "@material-ui/core/Grow";

const animationDuration = 500;

export default function MachineDetailsRow2(props) {
  const {
    operationCount,
    utilization,
    uptime,
    downtime,
    temperatureNow,
    temperatureMax,
    temperatureMin,
    humidityNow,
    humidityMax,
    humidityMin,
  } = props.data;

  const utilizationCard = {
    title: "Utilization",
    gaugeValue: utilization,
    gaugeUnit: " %",
    maxTitle: "Uptime",
    minTitle: "Downtime",
    maxValue: uptime,
    minValue: downtime,
    thresholds: {
      high: 66,
      low: 33,
    },
  };

  const oeeCard = {
    title: "Operation Count",
    gaugeValue: operationCount,
    gaugeUnit: "",
    maxTitle: "Maximum",
    minTitle: "Minimum",
    maxValue: 100,
    minValue: 0,
    thresholds: {
      high: 66,
      low: 33,
    },
  };

  const temperatureCard = {
    title: "Temperature",
    gaugeValue: temperatureNow,
    gaugeUnit: " \u00B0C",
    maxTitle: "Maximum",
    minTitle: "Minimum",
    maxValue: temperatureMax,
    minValue: temperatureMin,
    thresholds: {
      high: 66,
      low: 33,
    },
  };

  const humidityCard = {
    title: "Humidity",
    gaugeValue: humidityNow,
    gaugeUnit: " %RH",
    maxTitle: "Maximum",
    minTitle: "Minimum",
    maxValue: humidityMax,
    minValue: humidityMin,
    thresholds: {
      high: 66,
      low: 33,
    },
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 5 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <CardWithGauge data={utilizationCard} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 6 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <CardWithGauge data={oeeCard} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 7 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <CardWithGauge data={temperatureCard} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 8 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <CardWithGauge data={humidityCard} />
        </Grid>
      </Grow>
    </Grid>
  );
}
