import React, { useEffect, useState } from "react";

// Utils
import keys from "../../../../utils/keys";
import { isNotEmpty } from "../../../../utils/validation";
import { parseDataFromSSN } from "../../../../utils/parse";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { getMachineDataByIDAction } from "../../../../redux/actions/machineMonitoring/machineDetailsActions";
import { common } from "../../../../redux/actions/actionTypes";

// Styling
import { common as styles } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

// MUI
import Grid from "@material-ui/core/Grid";
import HistoryIcon from "@material-ui/icons/History";
import { makeStyles } from "@material-ui/core/Styles";

// Custom Components
import MachineDetailsRow1 from "./MachineDetailsRow1";
import MachineDetailsRow2 from "./MachineDetailsRow2";
import MachineDetailsRow3 from "./MachineDetailsRow3";

// Common Components
import BreadcrumbsNav from "../../../common/Breadcrumbs";
import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import AlertCard from "../../../common/AlertCard";
import Loader from "../../../common/Loader";

// Placeholder Data
import { liveMachineData } from "../../../../data/machineData";

// Web-socket
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

  const { machineID } = props.match.params;

  const [timeFilter, settimeFilter] = useState(timeFiltersList[0]);
  const [liveData, setLiveData] = useState(null);

  const loading = useSelector((state) => state.machineDetails.machineLoading);
  const timeFilterSelected = useSelector((state) => state.common.timeFilter);
  const storedData = useSelector((state) => state.machineDetails.data);
  const noData = useSelector(
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
    operationCount,
  } = parsedMachineData;

  const lastUpdateTimestamp = new Date(timestampEnd).toLocaleTimeString(
    "en-US"
  );

  const lineCharts = {
    machineState: {
      series: machineState,
      timestamps: timestamps,
      name: "State",
      color: chartColors.machineState,
      yLabels: ["OFF", "IDLE", "ON"],
      yMax: 3,
      type: "line",
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
    <Grid container justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} md={"auto"}>
        <BreadcrumbsNav list={props.navigationList} />
      </Grid>
      <Grid item xs={12} md={"auto"}>
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <FilterAndSortMenu
              width={100}
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
          <AlertCard message={"No data has been stored yet for this machine"} />
        </Grid>
      </Grid>
    </Grid>
  );

  return loading
    ? renderLoading
    : noData !== null
    ? renderNoData
    : renderLoaded;
}
