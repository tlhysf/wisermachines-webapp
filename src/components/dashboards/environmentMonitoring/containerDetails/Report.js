import React from "react";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// import Button from "@material-ui/core/Button";
import Grow from "@material-ui/core/Grow";
import colors from "../../../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  constainerPrimary: {
    flexGrow: 1,
    maxWidth: "95vw",
  },
  containerSecondary: {
    maxHeight: "85vh",
  },
});

const animationDuration = 200;

const Report = (props) => {
  const classes = useStyles();

  const {
    humidity,
    humidityAlerts,
    temperature,
    temperatureAlerts,
    timestamps,
  } = props.data;

  const columnTitles = ["Alert", "Value", "Time", "Date"];

  const renderTableHeader = (
    <TableRow>
      {columnTitles.map((column, i) => (
        <TableCell key={i} align="left">
          {column}
        </TableCell>
      ))}
    </TableRow>
  );

  let tableRows = [];

  timestamps.map((timestamp, i) => {
    const dateTime = new Date(timestamp);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();

    const low = { color: colors.BLUE[600] };
    const high = { color: colors.RED[600] };

    const lowHumidityMsg = (
      <span style={low}>{"Low humidity threshold crossed"}</span>
    );
    const highHumidityMsg = (
      <span style={high}>{"High humidity threshold crossed"}</span>
    );
    const lowTemperatureMsg = (
      <span style={low}>{"Low temperature threshold crossed"}</span>
    );
    const highTemperatureMsg = (
      <span style={high}>{"High temperature threshold crossed"}</span>
    );

    const lowHumidity = humidityAlerts[i] === -1;
    const highHumidity = humidityAlerts[i] === 1;
    const lowTemperature = temperatureAlerts[i] === -1;
    const highTemperature = temperatureAlerts[i] === 1;

    const isHumidityAlert = lowHumidity || highHumidity;
    const isTemperatureALert = lowTemperature || highTemperature;

    const isAlert = isHumidityAlert || isTemperatureALert;
    const isBothAlert = isHumidityAlert && isTemperatureALert;

    // array of cells: ["Alert", "Value", "Time", "Date"];
    // array of rows: [array of cells]

    if (isAlert) {
      if (isBothAlert) {
        // insert 2 arrays of cells
        let tCells = [];
        if (lowTemperature) {
          tCells = [lowTemperatureMsg, temperature[i], time, date];
        }
        if (highTemperature) {
          tCells = [highTemperatureMsg, temperature[i], time, date];
        }

        let hCells = [];
        if (lowHumidity) {
          hCells = [lowHumidityMsg, humidity[i], time, date];
        }
        if (highHumidity) {
          hCells = [highHumidityMsg, humidity[i], time, date];
        }

        tableRows.push(tCells);
        tableRows.push(hCells);
      } else {
        // insert 1 array of cells
        let cells = [];

        if (lowHumidity) {
          cells = [lowHumidityMsg, humidity[i], time, date];
        }
        if (highHumidity) {
          cells = [highHumidityMsg, humidity[i], time, date];
        }
        if (lowTemperature) {
          cells = [lowTemperatureMsg, temperature[i], time, date];
        }
        if (highTemperature) {
          cells = [highTemperatureMsg, temperature[i], time, date];
        }

        tableRows.push(cells);
      }
    } else {
      // no alert, do nothing
    }

    return i;
  });

  tableRows.reverse(); // sort by newest

  const renderTable = tableRows.map((cells, i) => (
    <TableRow key={i} hover>
      {cells.map((cell, j) => (
        <TableCell key={j} align="left">
          {cell}
        </TableCell>
      ))}
    </TableRow>
  ));

  const tablePopulated = (
    <Grow in={true} {...{ timeout: animationDuration + 4 * animationDuration }}>
      <Paper className={classes.root}>
        <div className={classes.constainerPrimary}>
          <TableContainer className={classes.containerSecondary}>
            <Table stickyHeader>
              <TableHead>{renderTableHeader}</TableHead>
              <TableBody>{renderTable}</TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </Grow>
  );

  return tablePopulated;
};

export default Report;

// const timestampToDate = (timestamp) => {
//   const dateTime = new Date(timestamp);
//   return dateTime.toLocaleTimeString() + " - " + dateTime.toLocaleDateString();
// };
