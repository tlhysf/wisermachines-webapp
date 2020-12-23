import React from "react";
import Grid from "@material-ui/core/Grid";
import LineChart from "../../../common/LineChart";

export default function MachineDetailsRow3(props) {
  const currentChartData = props.lineCharts.machineCurrent;
  const stateChartData = props.lineCharts.machineState;

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item md={6} xs={12}>
        <LineChart chartData={currentChartData} />
      </Grid>
      <Grid item md={6} xs={12}>
        <LineChart chartData={stateChartData} />
      </Grid>
    </Grid>
  );
}
