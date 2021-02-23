import React from "react";
// import Pdf from "react-to-pdf";
import { useSelector, useDispatch } from "react-redux";

// import {
//   PDFViewer,
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Image as PDFImage,
// } from "@react-pdf/renderer";

// import html2canvas from "html2canvas";
// import { htmlToText } from "html-to-text";
// import DomToImage from "dom-to-image";
// import { Table, TableRow, TableCell } from "react-table-pdf";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import AssessmentIcon from "@material-ui/icons/Assessment";

import LineChart from "./LineChartForReport";

import colors from "../../../../../utils/colors";
import { common } from "../../../../../utils/styles";
import { makeStyles } from "@material-ui/core/styles";

import { parseEnviromentDataFromSSN } from "../../../../../utils/parse";

import { showToastsAction } from "../../../../../redux/actions/environmentMonitoring/containerDetailsActions";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => common(theme));

// const stylesForDocument = StyleSheet.create({
//   page: {
//     display: "flex",
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//     flexDirection: "column",
//     backgroundColor: "#ffffff",
//     padding: 10,
//   },

//   tableContainer: {
//     flexDirection: "column",
//     width: "100%",
//   },

//   tableHeaderRow: {
//     backgroundColor: colors.BLUEGREY[700],
//     color: "white",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-around",
//     flexDirection: "row",
//     width: "100%",
//     padding: 5,
//   },

//   tableRow: {
//     backgroundColor: "white",
//     color: colors.BLUEGREY[700],
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-around",
//     flexDirection: "row",
//     width: "100%",
//     borderBottom: true,
//     borderBottomStyle: "solid",
//     borderBottomColor: colors.BLUEGREY[700],
//     padding: 5,
//   },
//   tableCell: [
//     {
//       width: "40%",
//       paddingRight: 5,
//     },
//     {
//       width: "20%",
//       paddingRight: 5,
//     },
//     {
//       width: "20%",
//       paddingRight: 5,
//     },
//     {
//       width: "20%",
//       paddingRight: 5,
//     },
//   ],

//   tableHeaderText: {
//     fontSize: 14,
//   },

//   tableContentText: {
//     fontSize: 12,
//   },
// });

// const ReportDocument = (props) => {
//   const {
//     // Time
//     timestamps,

//     // Temperature
//     temperature,
//     temperatureAlerts,

//     // Humidity
//     humidity,
//     humidityAlerts,
//   } = props.data;

//   let tableRows = [];

//   timestamps.map((timestamp, i) => {
//     const dateTime = new Date(timestamp);
//     const date = dateTime.toLocaleDateString();
//     const time = dateTime.toLocaleTimeString();

//     // const low = { color: colors.BLUE[600] };
//     // const high = { color: colors.RED[600] };

//     const lowHumidityMsg = "Low humidity threshold crossed";
//     const highHumidityMsg = "High humidity threshold crossed";

//     const lowTemperatureMsg = "Low temperature threshold crossed";
//     const highTemperatureMsg = "High temperature threshold crossed";

//     const lowHumidity = humidityAlerts[i] === -1;
//     const highHumidity = humidityAlerts[i] === 1;
//     const lowTemperature = temperatureAlerts[i] === -1;
//     const highTemperature = temperatureAlerts[i] === 1;

//     const isHumidityAlert = lowHumidity || highHumidity;
//     const isTemperatureALert = lowTemperature || highTemperature;

//     const isAlert = isHumidityAlert || isTemperatureALert;
//     const isBothAlert = isHumidityAlert && isTemperatureALert;

//     // array of cells: ["Alert", "Value", "Time", "Date"];
//     // array of rows: [array of cells]

//     if (isAlert) {
//       if (isBothAlert) {
//         // insert 2 arrays of cells
//         let tCells = [];
//         if (lowTemperature) {
//           tCells = [lowTemperatureMsg, temperature[i], time, date];
//         }
//         if (highTemperature) {
//           tCells = [highTemperatureMsg, temperature[i], time, date];
//         }

//         let hCells = [];
//         if (lowHumidity) {
//           hCells = [lowHumidityMsg, humidity[i], time, date];
//         }
//         if (highHumidity) {
//           hCells = [highHumidityMsg, humidity[i], time, date];
//         }

//         tableRows.push(tCells);
//         tableRows.push(hCells);
//       } else {
//         // insert 1 array of cells
//         let cells = [];

//         if (lowHumidity) {
//           cells = [lowHumidityMsg, humidity[i], time, date];
//         }
//         if (highHumidity) {
//           cells = [highHumidityMsg, humidity[i], time, date];
//         }
//         if (lowTemperature) {
//           cells = [lowTemperatureMsg, temperature[i], time, date];
//         }
//         if (highTemperature) {
//           cells = [highTemperatureMsg, temperature[i], time, date];
//         }

//         tableRows.push(cells);
//       }
//     } else {
//       // no alert, do nothing
//     }

//     return i;
//   });

//   tableRows.reverse(); // sort by newest

//   const renderTableContent = tableRows.map((cells, i) => (
//     <View style={stylesForDocument.tableRow}>
//       {cells.map((cell, j) => (
//         <View style={stylesForDocument.tableCell[j]}>
//           <Text style={stylesForDocument.tableContentText}>{cell}</Text>
//         </View>
//       ))}
//     </View>
//   ));

//   const columnTitles = ["Event", "Value", "Time", "Date"];

//   const renderTableHeader = (
//     <View style={stylesForDocument.tableHeaderRow}>
//       {columnTitles.map((column, j) => (
//         <View style={stylesForDocument.tableCell[j]}>
//           <Text style={stylesForDocument.tableHeaderText}>{column}</Text>
//         </View>
//       ))}
//     </View>
//   );

//   return (
//     <Document>
//       <Page size="A4" style={stylesForDocument.page}>
//         <View style={stylesForDocument.tableContainer}>
//           {renderTableHeader}
//           {renderTableContent}
//         </View>
//       </Page>
//     </Document>
//   );
// };

const generateProps = (inputArray, props, timeFrame, table) => {
  const {
    timestamps,
    temperature,
    temperatureAlerts,

    humidity,
    humidityAlerts,
  } = parseEnviromentDataFromSSN(inputArray);

  const { chartColors } = props;

  const lineCharts = {
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
    temperatureAlerts: {
      series: temperatureAlerts.map((x) => x + 1),
      timestamps: timestamps,
      name: "Temperature Alerts",
      color: chartColors.temperatureAlerts,
      step: "center",
      yMax: 3,
      yLabels: ["LOW", "NORMAL", "HIGH"],
    },
    humidityAlerts: {
      series: humidityAlerts.map((x) => x + 1),
      timestamps: timestamps,
      name: "Humidity Alerts",
      color: chartColors.humidityAlerts,
      step: "center",
      yMax: 3,
      yLabels: ["LOW", "NORMAL", "HIGH"],
    },
  };

  const generateTableProps = (inputArray) => {
    const max = Math.max(...inputArray);
    const min = Math.min(...inputArray);
    const maxTimestamp = timestamps[inputArray.indexOf(max)];
    const minTimestamp = timestamps[inputArray.indexOf(min)];
    return {
      title: "Temperature",
      timeFrame,
      min,
      max,
      maxTimestamp,
      minTimestamp,
    };
  };

  const tableProps = {
    temperature: generateTableProps(temperature),
    humidity: generateTableProps(humidity),
  };

  return table ? tableProps : lineCharts;
};

const temperatureOrHumidity = ["temperature", "humidity"];

const renderContent = (inputObject, temperatureOrHumidity, props) => {
  return Object.keys(inputObject).map((key) => {
    const forPrimaryChart = temperatureOrHumidity;
    const forAlertsChart = temperatureOrHumidity + "Alerts";
    const timeFrame = new Date(key).toLocaleDateString();
    const chartProps = generateProps(inputObject[key], props, timeFrame);
    const tableProps = generateProps(inputObject[key], props, timeFrame, true);

    console.log(tableProps[temperatureOrHumidity]);

    return (
      <Grid
        item
        key={key}
        xs={12}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={"button"}
              color="textPrimary"
              style={{ paddingRight: 10 }}
            >
              {forPrimaryChart}
            </Typography>
            <Typography variant={"button"} color="textSecondary">
              {new Date(key).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <LineChart chartData={chartProps[forPrimaryChart]} />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <LineChart chartData={chartProps[forAlertsChart]} />
          </Grid>
        </Grid>
      </Grid>
    );
  });
};

const Report = (props) => {
  // const [imageSrc, setImageSrc] = React.useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  const [showReport, setShowReport] = React.useState(false);

  const handleReportButton = (e) => {
    setShowReport(!showReport);
    showToastsAction(dispatch);
  };

  const pdfContainer = React.useRef(null);

  const storedData = useSelector(
    (state) => state.environmentMonitoring.containerDetails.containerDetailsData
  );

  // Apply time filter on storedData first, then call parsing function
  const slicedByDays = getSlicedData(storedData, "days");

  // const parsedData = parseEnviromentDataFromSSN(storedData);

  // const renderReportDocument = (
  //   <ReportDocument data={parsedData} img={imageSrc} />
  // );

  // React.useEffect(() => {
  //   if (showReport) {
  //     const node = chartRef.current;
  //     if (node !== null) {
  //       DomToImage.toPng(node)
  //         .then((dataUrl) => {
  //           const img = new Image();
  //           img.src = dataUrl;
  //           // document.body.appendChild(img);
  //           setImageSrc(img.src);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   }
  // });

  const handlePrintButton = (e) => {
    // const printContent = pdfContainer.current;
    // const WinPrint = window.open(
    //   "",
    //   "",
    //   "fullscreen=yes,toolbar=0,scrollbars=0,status=0"
    // );
    // WinPrint.document.write(printContent.innerHTML);
    // WinPrint.document.close();
    // WinPrint.focus();
    // WinPrint.print();
    // WinPrint.close();
    console.log("clicked print");
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
        {/* <DialogTitle>
          <Typography variant="button" style={{ color: colors.TEAL[800] }}>
            Export
          </Typography>
        </DialogTitle> */}
        <DialogContent dividers>
          {/* <Pdf targetRef={ref} filename="example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
          </Pdf> */}
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
                width: "210mm",
                height: "297mm",
              }}
              ref={pdfContainer}
            >
              <Grid
                container
                style={
                  {
                    // border: true,
                    // borderStyle: "solid",
                    // borderColor: colors.BLUEGREY[500],
                    // borderWidth: 1,
                  }
                }
                direction="row"
                justify="center"
                alignItems="flex-start"
              >
                {renderContent(slicedByDays, temperatureOrHumidity[0], props)}
                {renderContent(slicedByDays, temperatureOrHumidity[1], props)}
              </Grid>
            </div>
          </div>

          {/* <PDFViewer width={"100%"} height={"100%"}>
            {renderReportDocument}
          </PDFViewer> */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => handlePrintButton(e)}
          >
            Print
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={(e) => handleReportButton(e)}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Report;

const getSlicedData = (inputData, unit) => {
  // input data is assumed to be of less than one month
  // input data is assumed to be an array of packets

  // output is also array of packets
  const slicedOutputData = {};

  // outlier can be any number other than 1-31 (for days) and 0-23 (for hours)
  const outlier = 100;

  const getValue = (timestamp) => {
    if (unit === "days") {
      return new Date(timestamp).getDate();
    }
    if (unit === "hours") {
      return new Date(timestamp).getHours();
    }
  };

  let saved = outlier;

  const keys = inputData
    .map((item) => {
      const { timestamp } = item;
      const current = getValue(timestamp);

      if (current !== saved) {
        saved = current;
        return timestamp;
      }

      return outlier;
    })
    .filter((x) => x !== outlier);

  for (let i = 0; i < keys.length; i++) {
    const filtered = inputData
      .map((item) => {
        if (getValue(item.timestamp) === getValue(keys[i])) {
          return item;
        }
        return null;
      })
      .filter((x) => x);

    slicedOutputData[String(keys[i])] = filtered;
  }

  return slicedOutputData;
};
