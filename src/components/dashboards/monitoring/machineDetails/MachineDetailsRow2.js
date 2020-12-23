import React from "react";
import Grid from "@material-ui/core/Grid";
import CardWithGauge from "./CardWithGuage";

export default function MachineDetailsRow2(props) {
  const {
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
    gaugeUnit: "Percent",
    maxTitle: "Uptime",
    minTitle: "Downtime",
    maxValue: uptime,
    minValue: downtime,
  };

  const oeeCard = {
    title: "OEE",
    gaugeValue: utilization,
    gaugeUnit: "Percent",
    maxTitle: "Maximum",
    minTitle: "Minimum",
    maxValue: utilization,
    minValue: utilization,
  };

  const temperatureCard = {
    title: "Temperature",
    gaugeValue: temperatureNow,
    gaugeUnit: "\u00B0C",
    maxTitle: "Maximum",
    minTitle: "Minimum",
    maxValue: temperatureMax,
    minValue: temperatureMin,
  };

  const humidityCard = {
    title: "Humidity",
    gaugeValue: humidityNow,
    gaugeUnit: "%RH",
    maxTitle: "Maximum",
    minTitle: "Minimum",
    maxValue: humidityMax,
    minValue: humidityMin,
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item md={3} xs={12}>
        <CardWithGauge pills data={utilizationCard} />
      </Grid>
      <Grid item md={3} xs={12}>
        <CardWithGauge pills data={oeeCard} />
      </Grid>
      <Grid item md={3} xs={12}>
        <CardWithGauge pills data={temperatureCard} />
      </Grid>
      <Grid item md={3} xs={12}>
        <CardWithGauge pills data={humidityCard} />
      </Grid>
    </Grid>
  );
}
