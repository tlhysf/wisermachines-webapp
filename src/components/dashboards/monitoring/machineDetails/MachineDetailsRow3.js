import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LineChart from "../../../common/LineChart";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function MachineDetailsRow3(props) {
  const {
    machineCurrent,
    machineState,
    machinePower,
    temperature,
    humidity,
  } = props.lineCharts;

  const [buttonIndex, setButtonIndex] = useState(0);

  const chartsList = [
    machineCurrent,
    machineState,
    machinePower,
    temperature,
    humidity,
  ];

  const chartNamesList = [
    "Current (A)",
    "State",
    "Power (W)",
    "Temperature (C)",
    "Humidity (%RH)",
  ];

  const chartButtons = chartsList.map((chart, chartIndex) => {
    const color = chartIndex === buttonIndex ? "white" : "grey";
    const backgroundColor = chartIndex === buttonIndex ? "grey" : "white";
    return (
      <Grid item key={chartIndex}>
        <Button
          variant="contained"
          style={{ color: color, backgroundColor: backgroundColor }}
          onClick={(e) => setButtonIndex(chartIndex)}
        >
          <Typography variant="caption" color={color}>
            {chartNamesList[chartIndex]}
          </Typography>
        </Button>
      </Grid>
    );
  });

  const chartRenders = chartsList.map((chart, chartIndex) => (
    <LineChart chartData={chart} />
  ));

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      component={Paper}
      elevation={2}
    >
      <Grid item xs={12} style={{ padding: 15 }}>
        <Grid container spacing={1} justify="center" alignItems="center">
          {chartButtons}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {chartRenders[buttonIndex]}
      </Grid>
    </Grid>
  );
}
