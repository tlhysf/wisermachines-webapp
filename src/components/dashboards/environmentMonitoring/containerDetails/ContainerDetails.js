import React, { useEffect, useState } from "react";

// Toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Typography from "@material-ui/core/Typography";
// import Button from "@material-ui/core/Button";
// import AssessmentIcon from "@material-ui/icons/Assessment";
// import Tooltip from "@material-ui/core/Tooltip";

// Custom Components
import Cards from "./Cards";
import Charts from "./Charts";
import Alerts from "./Alerts";
import Report from "./Report/Index";

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

// const useStyles = makeStyles((theme) => common(theme));

export default function ContainerDetails(props) {
  // const classes = useStyles();

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
      }, 3000);
    }
  }, [containerID]);

  // console.log(liveData);

  // ******* TOASTS *******

  const [toastsCount, setToastsCount] = useState(0);

  let showToasts = useSelector(
    (state) => state.environmentMonitoring.containerDetails.showToasts
  );

  // const dismissAll = () => {
  //   toast.dismiss();
  //   setToastsCount(0);
  // };

  const toastsContainer = showToasts ? (
    <ToastContainer
      position="bottom-left"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      enableMultiContainer
      containerId={"ContainerDetails"}
      // limit={keys.showMockData ? 5 : 100}
      // closeButton={
      //   <Tooltip placment="right" title="Dismiss All">
      //     <i onClick={(e) => dismissAll()}>x</i>
      //   </Tooltip>
      // }
    />
  ) : null;

  const notifyLow = (msg) => {
    const notify = (value) =>
      toast.info(value, { containerId: "ContainerDetails" });

    notify(msg, {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setToastsCount(toastsCount + 1);
  };

  const notifyHigh = (msg) => {
    const notify = (value) =>
      toast.error(value, { containerId: "ContainerDetails" });

    notify(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setToastsCount(toastsCount + 1);
  };

  const humidityUnit = " %RH";
  const temperatureUnit = " \u00B0C";

  const toastContent = (data, type, unit) => {
    const lastUpdateTimestamp = new Date(data.timestamp).toLocaleTimeString(
      "en-US"
    );

    return (
      <div>
        <div>
          <Typography align="left" variant="button">
            {data[type]}
            {unit}
          </Typography>
        </div>

        <div>
          <Typography variant="caption" align="left">
            {lastUpdateTimestamp}
          </Typography>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (isNotEmpty(liveData)) {
      if (liveData.humidity_alert === -1) {
        const type = "humidity";
        notifyLow(toastContent(liveData, type, humidityUnit));
      }
      if (liveData.humidity_alert === 1) {
        const type = "humidity";
        notifyHigh(toastContent(liveData, type, humidityUnit));
      }
      if (liveData.temperature_alert === -1) {
        const type = "temperature";
        notifyLow(toastContent(liveData, type, temperatureUnit));
      }
      if (liveData.temperature_alert === 1) {
        const type = "temperature";
        notifyHigh(toastContent(liveData, type, temperatureUnit));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveData]);

  // const dismissAllButton =
  //   toastsCount > 2 ? (
  //     <div style={{ padding: 10 }}>
  //       <Fab
  //         variant="extended"
  //         style={{ backgroundColor: colors.BLUEGREY[700] }}
  //         size="medium"
  //         onClick={(e) => dismissAll()}
  //       >
  //         <Typography variant="caption" style={{ color: "white" }}>
  //           Dismiss All
  //         </Typography>
  //       </Fab>
  //     </div>
  //   ) : null;

  // ******* ******* *******

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
      yLabels: ["LOW", "NORMAL", "HIGH"],
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
      yLabels: ["LOW", "NORMAL", "HIGH"],
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
            <Report chartColors={chartColors} thresholds={containerProfile} />
          </Grid>
          <Grid item>
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

      {toastsContainer}
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
          <AlertCard message={"Couldnt find anything"} />
        </Grid>
      </Grid>
    </Grid>
  );

  return loading ? renderLoading : noData ? renderNoData : renderLoaded;
}
