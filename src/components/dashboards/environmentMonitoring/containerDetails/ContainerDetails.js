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

// MUI
import Grid from "@material-ui/core/Grid";

// Custom Components
import Cards from "./Cards";
import Charts from "./Charts";
import Alerts from "./Alerts";

// Common Components
import BreadcrumbsNav from "../../../common/Breadcrumbs";
import AlertCard from "../../../common/AlertCard";
import Loader from "../../../common/Loader";

// Placeholder Data
import { liveEnvData } from "../../../../data/environmentData";

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

export default function ContainerDetails(props) {
  const dispatch = useDispatch();

  const { containerID } = props.match.params;

  const [liveData, setLiveData] = useState(null);

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

  const allData = !isNotEmpty(storedData)
    ? []
    : !isNotEmpty(liveData)
    ? storedData
    : [...storedData, liveData];

  const parsedData = parseEnviromentDataFromSSN(allData);

  useEffect(() => {
    populateContainerDetailsPageAction(dispatch, containerID);
    getContainerProfile(dispatch, containerID);
  }, [dispatch, containerID]);

  useEffect(() => {
    if (!keys.showMockData) {
      client.emit("send-data-environment", { _id: containerID });
    }
    if (!keys.showMockData) {
      client.on(`data-environment-${containerID}`, (msg) => {
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
        setLiveData(liveEnvData());
      }, 5000);
    }
  }, [containerID]);

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

  const lineCharts = {
    temperature: {
      series: temperature,
      timestamps: timestamps,
      name: "Temperature",
      color: chartColors.temperature,
      type: "line",
      large: true,
      yMax: 70,

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
      yMax: 70,

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
    },
  };

  const navbar = (
    <Grid container justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} md={"auto"}>
        <BreadcrumbsNav list={props.navigationList} />
      </Grid>
      <Grid item xs={12} md={"auto"}>
        <Alerts
          data={{
            humidity,
            humidityAlerts,
            temperature,
            temperatureAlerts,
            timestamps,
          }}
        />
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
          <AlertCard message={"No data has been stored yet."} />
        </Grid>
      </Grid>
    </Grid>
  );

  return loading ? renderLoading : noData ? renderNoData : renderLoaded;
}
