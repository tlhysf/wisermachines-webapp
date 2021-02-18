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
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AssessmentIcon from "@material-ui/icons/Assessment";

import LineChart from "./LineChartForReport";

import colors from "../../../../../utils/colors";
import { common } from "../../../../../utils/styles";
import { makeStyles } from "@material-ui/core/styles";

import { parseEnviromentDataFromSSN } from "../../../../../utils/parse";

import { showToastsAction } from "../../../../../redux/actions/environmentMonitoring/containerDetailsActions";

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

const Report = (props) => {
  // const [imageSrc, setImageSrc] = React.useState("");

  const classes = useStyles();
  const dispatch = useDispatch();

  // const chartRef = React.useRef(null);

  const storedData = useSelector(
    (state) => state.environmentMonitoring.containerDetails.containerDetailsData
  );

  // Apply time filter on storedData first, then call parsing function
  const slicedByDays = getSlicedData(storedData, "days");
  const {
    timestamps,
    temperature,
    temperatureAlerts,

    humidity,
    humidityAlerts,
  } = parseEnviromentDataFromSSN(Object.values(slicedByDays)[0]);

  // console.dir(slicedByDays);

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

  // const parsedData = parseEnviromentDataFromSSN(storedData);

  const [showReport, setShowReport] = React.useState(false);

  const handleReportButton = (e) => {
    setShowReport(!showReport);
    showToastsAction(dispatch);
  };

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
        <DialogContent>
          {/* <Pdf targetRef={ref} filename="example.pdf">
            {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
          </Pdf> */}
          <div>
            
              <LineChart chartData={lineCharts.temperature} />
            
            <LineChart chartData={lineCharts.temperatureAlerts} />
            <LineChart chartData={lineCharts.humidity} />
            <LineChart chartData={lineCharts.humidityAlerts} />
          </div>

          {/* <PDFViewer width={"100%"} height={"100%"}>
            {renderReportDocument}
          </PDFViewer> */}
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={(e) => handleReportButton(e)}>
            Back
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
