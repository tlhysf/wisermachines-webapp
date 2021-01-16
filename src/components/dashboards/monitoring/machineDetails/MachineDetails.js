import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMachineDataByIDAction } from "../../../../redux/actions/machineDetailsActions";
import { parseDataFromSSN } from "../../../../utils/parse";
import { common } from "../../../../redux/actions/actionTypes";
import { common as styles } from "../../../../utils/styles";
import { isNotEmpty } from "../../../../utils/validation";
import colors from "../../../../utils/colors";
import { timeDifference } from "../../../../utils/parse";

import Grid from "@material-ui/core/Grid";
import HistoryIcon from "@material-ui/icons/History";
import { makeStyles } from "@material-ui/core/Styles";

import BreadcrumbsNav from "../../../common/Breadcrumbs";
import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import MachineDetailsRow1 from "./MachineDetailsRow1";
import MachineDetailsRow2 from "./MachineDetailsRow2";
import MachineDetailsRow3 from "./MachineDetailsRow3";
import AlertCard from "../../../common/AlertCard";

import Loader from "../../../common/Loader";

import { liveMachineData } from "../../../../data/machineData";

import keys from "../../../../utils/keys";

import io from "socket.io-client";
const client = io(keys.server, {
  transports: ["websocket"],
});

const chartColors = {
  machineCurrent: colors.GREEN[500],
  machineState: colors.PURPLE[500],
  machinePower: colors.YELLOW[500],
  temperature: colors.ORANGE[500],
  humidity: colors.BLUE[500],
};

const timeFiltersList = ["Last Hour", "Last 12 Hours", "Last Day"];

const useStyles = makeStyles((theme) => styles(theme));

export default function MachineDetails(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [timeFilter, settimeFilter] = useState(timeFiltersList[0]);
  const [liveData, setLiveData] = useState(null);
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState("Updating...");

  const machineLoading = useSelector(
    (state) => state.machineDetails.machineLoading
  );
  const timeFilterSelected = useSelector((state) => state.common.timeFilter);
  const storedData = useSelector((state) => state.machineDetails.data);
  const noStoredMachineDataResponse = useSelector(
    (state) => state.machineDetails.noStoredMachineDataResponse
  );

  const allData = !isNotEmpty(storedData)
    ? []
    : !isNotEmpty(liveData)
    ? storedData
    : [...storedData, liveData];

  const parsedMachineData = parseDataFromSSN(
    allData,
    timeFiltersList.indexOf(timeFilter)
  );

  const { machineID } = props.match.params;

  useEffect(() => {
    settimeFilter(timeFilterSelected);
  }, [timeFilterSelected]);

  useEffect(() => {
    getMachineDataByIDAction(dispatch, machineID);
  }, [dispatch, machineID]);

  useEffect(() => {
    if (!keys.showMockData) {
      client.emit("send-data-demo-machine", { _id: machineID });
    }

    if (!keys.showMockData) {
      client.on(`data-demo-machine-${machineID}`, (msg) => {
        try {
          if (msg) {
            setLiveData(msg);
          } else {
            setLiveData(null);
          }
        } catch (error) {
          setLiveData(null);
          console.log(error);
        }
      });
    } else {
      // Mock live data generator
      setInterval(() => {
        setLiveData(liveMachineData());
      }, 5000);
    }
  }, [machineID]);

  const {
    // Time
    timestamps,
    timestampEnd,
    // timestampStart,
    // timestampStartFilter,

    // Enviroment
    temperature,
    temperatureNow,
    temperatureMax,
    temperatureMin,
    humidity,
    humidityNow,
    humidityMax,
    humidityMin,

    // Current
    loadCurrent,
    currentNow,

    // Power
    instantPower,
    unitsConsumed,

    // State
    machineState,
    stateNowDuration,
    stateNow,

    // Utilization
    utilization,
    uptime,
    downtime,
  } = parsedMachineData;

  const lastUpdateTimestamp = new Date(timestampEnd).toLocaleTimeString(
    "en-US"
  );

  useEffect(() => {
    if (liveData !== null) {
      // console.log("live");
      setTimeSinceLastUpdate(
        timeDifference(new Date().getTime(), timestampEnd)
      );
    } else {
      setInterval(() => {
        setTimeSinceLastUpdate(timeSinceLastUpdate);
        if (timestampEnd > 0) {
          // console.log("interval");
          setTimeSinceLastUpdate(
            timeDifference(new Date().getTime(), timestampEnd)
          );
        }
      }, 10 * 1000);
    }
  }, [timestampEnd, liveData, timeSinceLastUpdate]);

  const lineCharts = {
    machineState: {
      series: machineState,
      timestamps: timestamps,
      name: "State",
      color: chartColors.machineState,
      step: "center",
    },
    machinePower: {
      series: instantPower,
      timestamps: timestamps,
      name: "Power",
      color: chartColors.machinePower,
    },
    machineCurrent: {
      series: loadCurrent,
      timestamps: timestamps,
      name: "Current",
      color: chartColors.machineCurrent,
    },
    temperature: {
      series: temperature,
      timestamps: timestamps,
      name: "Temperature",
      color: chartColors.temperature,
    },
    humidity: {
      series: humidity,
      timestamps: timestamps,
      name: "Humidity",
      color: chartColors.humidity,
    },
  };

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
            <BreadcrumbsNav list={keys.navigationList.monitoring} />
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
                  style={{ color: colors.TEAL[700] }}
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  const renderLoading = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        {navbar}
      </Grid>

      <Loader />
    </Grid>
  );

  const renderLoaded = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        {navbar}
      </Grid>

      <Grid item xs={12}>
        <MachineDetailsRow1
          data={{
            currentNow,
            lastUpdateTimestamp,
            timeSinceLastUpdate,
            stateNow,
            stateNowDuration,
            unitsConsumed,
            timeFilter,
            liveData,
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

  const renderNoData = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        {navbar}
      </Grid>

      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "70vh" }}
          spacing={4}
        >
          <AlertCard message={noStoredMachineDataResponse} />
        </Grid>
      </Grid>
    </Grid>
  );

  return machineLoading
    ? renderLoading
    : noStoredMachineDataResponse !== null
    ? renderNoData
    : renderLoaded;
}
