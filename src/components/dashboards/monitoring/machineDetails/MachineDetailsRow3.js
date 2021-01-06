import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LineChart from "../../../common/LineChart";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import colors from "../../../../utils/colors";

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
    const selected = colors.BLUEGREY[600];
    const unSelected = colors.BLUEGREY[400];
    const color = chartIndex === buttonIndex ? selected : unSelected;

    return (
      <Grid item key={chartIndex}>
        <Button
          style={{ color: color }}
          onClick={(e) => setButtonIndex(chartIndex)}
        >
          <Typography variant="body2" color={color}>
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
