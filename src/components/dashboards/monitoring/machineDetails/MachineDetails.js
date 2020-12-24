import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMachineDataByIDAction } from "../../../../redux/actions/machineDetailsActions";
import { parseDataFromSSN } from "../../../../utils/parse";
import { common } from "../../../../redux/actions/actionTypes";
import { common as styles } from "../../../../utils/styles";
import { isNotEmpty } from "../../../../utils/validation";

import Grid from "@material-ui/core/Grid";
import HistoryIcon from "@material-ui/icons/History";
import { makeStyles } from "@material-ui/core/Styles";

import BreadcrumbsNav from "../../../common/Breadcrumbs";
import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import MachineDetailsRow1 from "./MachineDetailsRow1";
import MachineDetailsRow2 from "./MachineDetailsRow2";
import MachineDetailsRow3 from "./MachineDetailsRow3";

import { breadCrumbsList } from "../../../../Routes";

const timeFiltersList = ["Last Hour", "Last 12 Hours", "Last Day"];

const useStyles = makeStyles((theme) => styles(theme));

export default function MachineDetails(props) {

  // Checkpoint
  // timeSinceLastUpdatedWasRecieved = timeDifference(
  //   new Date().getTime(),
  //   timeStampEnd
  // );


  const classes = useStyles();

  const dispatch = useDispatch();

  const [timeFilter, settimeFilter] = useState(timeFiltersList[0]);
  const timeFilterSelected = useSelector((state) => state.common.timeFilter);

  useEffect(() => {
    settimeFilter(timeFilterSelected);
  }, [timeFilterSelected]);

  useEffect(() => {
    getMachineDataByIDAction(dispatch, props.match.params.machineID);
  }, [dispatch, props.match.params.machineID]);

  const storedData = useSelector((state) => state.machineDetails.data);

  const [liveData, setLiveData] = useState(null);

  const allData = !isNotEmpty(storedData)
    ? []
    : !isNotEmpty(liveData)
    ? storedData
    : [...storedData, liveData];

  const parsedMachineData = parseDataFromSSN(
    allData,
    timeFiltersList.indexOf(timeFilter)
  );

  // Row 1
  const {
    currentNow,
    stateNow,
    stateNowDuration,
    unitsConsumed,
  } = parsedMachineData;

  // Row 2
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
  } = parsedMachineData;

  // Row 3
  const lineCharts = {
    machineState: {
      series: parsedMachineData.machineState,
      timeStamps: parsedMachineData.timeStamps,
      name: "State",
      step: "center",
      decimal: 0,
      color: 0,
    },
    machineCurrent: {
      series: parsedMachineData.loadCurrent,
      timeStamps: parsedMachineData.timeStamps,
      name: "Current",
      step: "",
      decimal: 0,
      color: 2,
    },
  };

  console.log(parsedMachineData);

  const navbar = (
    <Grid container justify="center" alignItems="center" spacing={0}>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <BreadcrumbsNav list={breadCrumbsList.monitoring} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>
            <FilterAndSortMenu
              options={timeFiltersList}
              selected={timeFilter}
              type={common.filterByTime}
              icon={
                <HistoryIcon
                  className={classes.iconInsideButton}
                  color="action"
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        {navbar}
      </Grid>
      <Grid item xs={12}>
        <MachineDetailsRow1
          data={{
            currentNow,
            stateNow,
            stateNowDuration,
            unitsConsumed,
            timeFilter,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MachineDetailsRow2
          data={{
            utilization,
            uptime,
            downtime,
            temperatureNow,
            temperatureMax,
            temperatureMin,
            humidityNow,
            humidityMax,
            humidityMin,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <MachineDetailsRow3 lineCharts={lineCharts} />
      </Grid>
    </Grid>
  );
}
