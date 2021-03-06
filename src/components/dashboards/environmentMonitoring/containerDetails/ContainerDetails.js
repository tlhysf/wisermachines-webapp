import React, { useEffect, useState } from "react";

// Utils
import keys from "../../../../utils/keys";
import { isNotEmpty } from "../../../../utils/validation";
import { parseEnviromentDataFromSSN } from "../../../../utils/parse";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  populateContainerDetailsPageAction,
  getContainerProfile,
} from "../../../../redux/actions/environmentMonitoring/containerDetailsActions";

// Styling
import colors from "../../../../utils/colors";
// import { common } from "../../../../utils/styles";
// import { makeStyles } from "@material-ui/core/styles";

// MUI
import Grid from "@material-ui/core/Grid";
// import Fab from "@material-ui/core/Fab";
// import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import Tooltip from "@material-ui/core/Tooltip";

// Custom Components
import Cards from "./Cards";
import Charts from "./Charts";
import Report from "./Report/Index";

// Common Components
import BreadcrumbsNav from "../../../common/Breadcrumbs";
import AlertCard from "../../../common/AlertCard";
import Loader from "../../../common/Loader";
import AlertsPopover from "../../../common/Alerts";

// Placeholder Data
// import { liveEnvData } from "../../../../data/environmentData";

// Web-socket
import io from "socket.io-client";
const client = io(keys.server, {
  transports: ["websocket"],
});

const chartColors = {
  temperature: colors.GREEN[700],
  temperatureAlerts: colors.LIGHTGREEN[700],
  humidity: colors.BLUE[700],
  humidityAlerts: colors.CYAN[700],
};

// const useStyles = makeStyles((theme) => common(theme));

export default function ContainerDetails(props) {
  // const classes = useStyles();

  const dispatch = useDispatch();

  const { containerID } = props.match.params;

  const [liveData, setLiveData] = useState(null);
  const [liveDataArr, setLiveDataArr] = useState([]);

  const loading = useSelector(
    (state) =>
      state.environmentMonitoring.containerDetails.containerDetailsLoading
  );

  const storedData = useSelector(
    (state) => state.environmentMonitoring.containerDetails.containerDetailsData
  );

  const noData = useSelector(
    (state) => state.environmentMonitoring.containerDetails.notFound
  );

  let containerProfile = useSelector(
    (state) => state.environmentMonitoring.containerDetails.containerProfile
  );

  containerProfile = containerProfile !== null ? containerProfile[0] : {};

  useEffect(() => {
    if (!keys.showMockData) {
      client.emit("send-data-environment", { _id: containerID });
    }
    if (!keys.showMockData) {
      client.on(`data-environment-${containerID}`, (msg) => {
        try {
          if (
            isNotEmpty(msg)
            //&& msg.node_mac !== ignoreMAC
          ) {
            setLiveData(msg);
            // setLiveDataArr([...liveDataArr, msg]);
            setLiveDataArr((prevItems) => [...prevItems, msg]);
          }
        } catch (error) {
          setLiveData(null);
          console.log(error);
        }
      });
    } else {
      // // Mock live data generator
      // setInterval(() => {
      //   const msg = liveEnvData();
      //   setLiveData(msg);
      //   setLiveDataArr((prevItems) => [...prevItems, msg]);
      // }, 3000);
    }
    // eslint-disable-next-line
  }, [containerID]);

  const keys = [
    "humidity",
    "humidity_alert",
    "temperature",
    "temperature_alert",
    "timestamp",
  ];

  // Merge historical and live data
  const allData = JSON.parse(JSON.stringify(storedData));

  // eslint-disable-next-line
  keys.map((key) => {
    try {
      // eslint-disable-next-line
      liveDataArr.map((packet) => {
        allData[key].push(packet[key]);
      });
    } catch (e) {
      console.log(e);
    }
  });

  const debugDataMerger = (enable) => {
    if (enable) {
      try {
        console.log("live data (should increment by 1):", liveDataArr.length);

        console.log(
          "original stored data (should stay the same):",
          storedData[keys[1]].length
        );

        console.log(
          "diff (should be equal to original):",
          allData[keys[1]].length - liveDataArr.length
        );

        console.log(
          "merged data (should increment by 1):",
          allData[keys[1]].length
        );

        console.log(
          "sum (should be equal to merged data):",
          storedData[keys[1]].length + liveDataArr.length
        );

        console.log("");
      } catch (e) {}
    }
  };

  // set to true to log in console
  debugDataMerger(false);

  const parsedData = parseEnviromentDataFromSSN(allData);

  useEffect(() => {
    populateContainerDetailsPageAction(dispatch, containerID);
    getContainerProfile(dispatch, containerID);
  }, [dispatch, containerID]);

  // console.log(liveData);

  const {
    // Time
    timestamps,
    timestampEnd,

    // Temperature
    temperature,
    temperatureAlerts,
    temperatureNow,
    temperatureAlertNow,

    // Humidity
    humidity,
    humidityAlerts,
    humidityNow,
    humidityAlertNow,
  } = parsedData;

  const lastUpdateTimestamp = new Date(timestampEnd).toLocaleTimeString(
    "en-US"
  );

  const thresholdLineColor = colors.BLUEGREY[600];
  const alertLabels = ["Low", "Ok", "High"];

  const yMax = (threshold, list) => {
    const max1 = threshold;
    const max2 = Math.max(...list);

    return Math.max(max1, max2);
  };

  const lineCharts = {
    cleanUp: {
      series: timestamps.map((x) => 1000),
      timestamps: timestamps,
      name: "",
      color: "rgb(0, 0, 0, 0)",
      type: "line",
      large: true,
      yMax: 0,

      series2: timestamps.map((x) => 1000),
      series2Name: "",
      series2Color: "rgb(0, 0, 0, 0)",

      series3: timestamps.map((x) => 1000),
      series3Name: "",
      series3Color: "rgb(0, 0, 0, 0)",
    },
    temperature: {
      series: temperature,
      timestamps: timestamps,
      name: "Temperature",
      color: chartColors.temperature,
      type: "line",
      large: true,
      yMax: yMax(containerProfile.max_temperature, temperature),

      series2: temperature.map((x) => containerProfile.max_temperature),
      series2Name: "Max Threshold",
      series2Color: thresholdLineColor,

      series3: temperature.map((x) => containerProfile.min_temperature),
      series3Name: "Min Threshold",
      series3Color: thresholdLineColor,
    },
    humidity: {
      series: humidity,
      timestamps: timestamps,
      name: "Humidity",
      color: chartColors.humidity,
      type: "line",
      large: true,
      yMax: yMax(containerProfile.max_humidity, humidity),

      series2: humidity.map((x) => containerProfile.max_humidity),
      series2Name: "Max Threshold",
      series2Color: thresholdLineColor,

      series3: humidity.map((x) => containerProfile.min_humidity),
      series3Name: "Min Threshold",
      series3Color: thresholdLineColor,
    },
    temperatureAlerts: {
      series: temperatureAlerts.map((x) => x + 1),
      timestamps: timestamps,
      name: "Temperature Alerts",
      color: chartColors.temperatureAlerts,
      type: "line",
      step: "center",
      large: true,
      yMax: 3,
      yLabels: alertLabels,
    },
    humidityAlerts: {
      series: humidityAlerts.map((x) => x + 1),
      timestamps: timestamps,
      name: "Humidity Alerts",
      color: chartColors.humidityAlerts,
      type: "line",
      step: "center",
      large: true,
      yMax: 3,
      yLabels: alertLabels,
    },
  };

  // const [showReport, setShowReport] = React.useState(false);
  // const handleReportButton = (e) => {
  //   setShowReport(!showReport);
  // };

  const navbar = (
    <Grid container justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} md={"auto"}>
        <BreadcrumbsNav list={props.navigationList} />
      </Grid>
      <Grid item xs={12} md={"auto"}>
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          {/* <Grid item>
            <Tooltip placement="top" title="Report">
              <Button
                className={classes.button}
                variant="contained"
                onClick={(e) => handleReportButton(e)}
              >
                <AssessmentIcon
                  className={classes.iconInsideButton}
                  style={{ color: colors.TEAL[700] }}
                />
              </Button>
            </Tooltip>
          </Grid> */}
          <Grid item>
            <Report
              chartColors={chartColors}
              containerProfile={containerProfile}
              lineCharts={lineCharts}
            />
          </Grid>
          <Grid item>
            <AlertsPopover ID={containerID} />
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

      <Loader color={colors.BLUE[600]} />

      <div>
        <AlertCard message={"Your Data is Being Loaded."} />
      </div>
    </Grid>
  );

  const renderLoaded = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12}>
        {navbar}
      </Grid>

      <Grid item xs={12}>
        <Cards
          data={{
            lastUpdateTimestamp,
            temperatureNow,
            temperatureAlertNow,
            humidityNow,
            humidityAlertNow,
            liveData,
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <Charts lineCharts={lineCharts} />
      </Grid>

      {/* <Grid item xs={12}>
        <Report
          data={{
            humidity,
            humidityAlerts,
            temperature,
            temperatureAlerts,
            timestamps,
          }}
        />
      </Grid> */}

      {/* {toastsContainer} */}
      {/* {dismissAllButton} */}
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
          <AlertCard message={"Couldn't find anything"} />
        </Grid>
      </Grid>
    </Grid>
  );

  return loading ? renderLoading : noData ? renderNoData : renderLoaded;
}
