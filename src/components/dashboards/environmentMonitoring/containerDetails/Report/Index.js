import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import AssessmentIcon from "@material-ui/icons/Assessment";
import Typography from "@material-ui/core/Typography";

import LineChart from "./Chart";
import Header from "./Header";

import colors from "../../../../../utils/colors";
import { common } from "../../../../../utils/styles";
import { makeStyles } from "@material-ui/core/styles";

import { parseEnviromentDataFromSSN } from "../../../../../utils/parse";
import { isNotEmpty } from "../../../../../utils/validation";

import { showToastsAction } from "../../../../../redux/actions/environmentMonitoring/containerDetailsActions";

const useStyles = makeStyles((theme) => common(theme));

const pageHeight = "210mm";
const pageWidth = "297mm";
// const pagePadding = 20;

const Report = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { containerProfile, lineCharts } = props;

  const [showReport, setShowReport] = React.useState(false);

  const handleReportButton = (e) => {
    setShowReport(!showReport);
    showToastsAction(dispatch);
  };

  const storedData = useSelector(
    (state) => state.environmentMonitoring.containerDetails.containerDetailsData
  );

  // Apply time filter on storedData first, then call parsing function
  // const slicedByDays = getSlicedData(storedData, "days");

  const parsedData = parseEnviromentDataFromSSN(storedData);

  const { timestampEnd, timestampStart } = parsedData;

  const getFullDateTimeString = (input) =>
    input.toLocaleDateString() + "_" + input.toLocaleTimeString();

  const headerData = {
    heading: "Zone Environment Data",
    logo: "/img/logo.png",

    filename: containerProfile.name + "_" + getFullDateTimeString(new Date()),

    from: getFullDateTimeString(new Date(timestampStart)),
    to: getFullDateTimeString(new Date(timestampEnd)),

    thresholds: {
      temperature: {
        min: containerProfile.min_temperature,
        max: containerProfile.max_temperature,
      },
      humidity: {
        min: containerProfile.min_humidity,
        max: containerProfile.max_humidity,
      },
    },
  };

  return (
    <div>
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
      <Dialog fullScreen open={showReport}>
        <DialogContent dividers>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <div
              style={{
                width: pageWidth,
                height: pageHeight,
                border: true,
                borderStyle: "solid",
                borderColor: colors.BLUEGREY[700],
                borderWidth: 2,
              }}
            >
              <Header data={headerData} />
              <Grid
                container
                style={{
                  paddingTop: 0,
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingBottom: 0,
                }}
              >
                <Grid
                  item
                  xs={6}
                  style={{
                    paddingRight: 7,
                  }}
                >
                  {renderReportColumn(
                    "Temperature (\u00B0C)",
                    lineCharts.temperature,
                    lineCharts.temperatureAlerts
                  )}
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={{
                    paddingLeft: 7,
                  }}
                >
                  {renderReportColumn(
                    "Humidity (%Rh)",
                    lineCharts.humidity,
                    lineCharts.humidityAlerts
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={(e) => handleReportButton(e)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Report;

const renderReportColumn = (heading, chartProps, alertChartProps) => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid
          container
          style={{
            border: true,
            borderStyle: "solid",
            borderColor: colors.BLUEGREY[500],
            borderWidth: 1,
          }}
        >
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Typography variant="button">{heading}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <LineChart chartData={chartProps} hideXAxis={true} />
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <LineChart chartData={alertChartProps} hideXAxis={false} />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
      >
        {renderTable(chartProps, alertChartProps)}
      </Grid>
    </Grid>
  );
};

const renderTable = (chartProps, alertChartProps) => {
  const { series, timestamps } = chartProps;

  // Minimum and maximum
  const max = Math.max(...series);
  const min = Math.min(...series);
  const maxTimestamp = new Date(
    timestamps[series.indexOf(max)]
  ).toLocaleTimeString();
  const minTimestamp = new Date(
    timestamps[series.indexOf(min)]
  ).toLocaleTimeString();

  // Average
  const arrAvg = (arr) => {
    if (isNotEmpty(arr)) {
      return arr.reduce((a, b) => a + b, 0) / arr.length;
    } else return 0;
  };
  const average = arrAvg(series).toFixed(2);

  // Standard Deviation
  const getStandardDeviation = (array) => {
    if (isNotEmpty(array)) {
      const n = array.length;
      const mean = array.reduce((a, b) => a + b) / n;
      return Math.sqrt(
        array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
      );
    } else return 0;
  };
  const stdDev = getStandardDeviation(series).toFixed(2);

  // Number of times high and low threshold were crossed
  const numberOfAlerts = (type) =>
    alertChartProps.series.filter((item) => item === type).length;

  const numberOfHighs = numberOfAlerts(2);
  const numberOfLows = numberOfAlerts(0);

  const renderTableCell = (cellsPerRow, value, textStyle) => {
    return (
      <Grid
        item
        xs={12 / cellsPerRow}
        style={{
          border: true,
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: 1,
          backgroundColor: colors.BLUEGREY[300],
        }}
      >
        <div style={{ paddingLeft: 10, paddingTop: 5, paddingBottom: 2 }}>
          <Typography variant={textStyle}>{value}</Typography>
        </div>
      </Grid>
    );
  };

  const tableBreak = <Grid item xs={12} style={{ marginTop: 5 }} />;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          {renderTableCell(3, "Max", "body2")}
          {renderTableCell(3, max, "subtitle2")}
          {renderTableCell(3, maxTimestamp, "caption")}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {renderTableCell(3, "Min", "body2")}
          {renderTableCell(3, min, "subtitle2")}
          {renderTableCell(3, minTimestamp, "caption")}
        </Grid>
      </Grid>
      {tableBreak}
      <Grid item xs={12}>
        <Grid container>
          {renderTableCell(4, "Average", "body2")}
          {renderTableCell(4, average, "subtitle2")}
          {renderTableCell(4, "Std. Deviation", "body2")}
          {renderTableCell(4, stdDev, "subtitle2")}
        </Grid>
      </Grid>
      {tableBreak}
      <Grid item xs={12}>
        <Grid container>
          {renderTableCell(2, "Overshoot Frequency", "body2")}
          {renderTableCell(2, numberOfHighs, "subtitle2")}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          {renderTableCell(2, "Undershoot Frequency", "body2")}
          {renderTableCell(2, numberOfLows, "subtitle2")}
        </Grid>
      </Grid>
    </Grid>
  );
};
