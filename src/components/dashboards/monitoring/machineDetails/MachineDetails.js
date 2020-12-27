import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMachineDataByIDAction } from "../../../../redux/actions/machineDetailsActions";
import { parseDataFromSSN } from "../../../../utils/parse";
import { common } from "../../../../redux/actions/actionTypes";
import { common as styles } from "../../../../utils/styles";
import { isNotEmpty } from "../../../../utils/validation";
import { timeDifference } from "../../../../utils/parse";
import colors from "../../../../utils/colors";

import Grid from "@material-ui/core/Grid";
import HistoryIcon from "@material-ui/icons/History";
import { makeStyles } from "@material-ui/core/Styles";

import BreadcrumbsNav from "../../../common/Breadcrumbs";
import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import MachineDetailsRow1 from "./MachineDetailsRow1";
import MachineDetailsRow2 from "./MachineDetailsRow2";
import MachineDetailsRow3 from "./MachineDetailsRow3";
import MachineDetailsLoader from "./MachineDetailsLoader";

import { breadCrumbsList } from "../../../../Routes";

import keys from "../../../../utils/keys";

import io from "socket.io-client";
const client = io(keys.server, {
  transports: ["websocket"],
});

const timeFiltersList = ["Last Hour", "Last 12 Hours", "Last Day"];

const useStyles = makeStyles((theme) => styles(theme));

export default function MachineDetails(props) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [timeFilter, settimeFilter] = useState(timeFiltersList[0]);
  const [timeSinceLastUpdate, setTimeSinceLastUpdate] = useState("Updating...");
  const [liveData, setLiveData] = useState(null);

  const machineLoading = useSelector(
    (state) => state.machineDetails.machineLoading
  );
  const timeFilterSelected = useSelector((state) => state.common.timeFilter);
  const storedData = useSelector((state) => state.machineDetails.data);

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
    client.emit("send-data-demo-machine", { _id: machineID });
    // client.on(`data-demo-machine-${machineID}`, (msg) => {
    //   try {
    //     if (msg) {
    //       setLiveData(msg);
    //     } else {
    //       setLiveData(null);
    //     }
    //   } catch (error) {
    //     setLiveData(null);
    //     console.log(error);
    //   }
    // });
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

    //State
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
    const interval = setInterval(() => {
      setTimeSinceLastUpdate(
        timeDifference(new Date().getTime(), timestampEnd)
      );
    }, 1000 * 5);
    return () => clearInterval(interval);
  }, []);

  const lineCharts = {
    machineState: {
      series: machineState,
      timestamps: timestamps,
      name: "State",
      step: "center",
      color: 4,
    },
    machinePower: {
      series: instantPower,
      timestamps: timestamps,
      name: "Power",
      step: "",
      color: 7,
    },
    machineCurrent: {
      series: loadCurrent,
      timestamps: timestamps,
      name: "Current",
      step: "",
      color: 2,
    },
    temperature: {
      series: temperature,
      timestamps: timestamps,
      name: "Temperature",
      color: 3,
    },
    humidity: {
      series: humidity,
      timestamps: timestamps,
      name: "Humidity",
      step: "",
      color: 6,
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
                  style={{ color: colors.TEAL[700] }}
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
      {machineLoading ? MachineDetailsLoader : null}
      {machineLoading ? null : (
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
              timeSinceLastUpdate,
            }}
          />
        </Grid>
      )}
      {machineLoading ? null : (
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
      )}
      {machineLoading ? null : (
        <Grid item xs={12}>
          <MachineDetailsRow3 lineCharts={lineCharts} />
        </Grid>
      )}
    </Grid>
  );
}
