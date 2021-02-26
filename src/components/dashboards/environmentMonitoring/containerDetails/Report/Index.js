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

import { showToastsAction } from "../../../../../redux/actions/environmentMonitoring/containerDetailsActions";

const useStyles = makeStyles((theme) => common(theme));

const Report = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { chartColors, containerProfile } = props;

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
                width: "297mm",
                height: "210mm",
                border: true,
                borderStyle: "solid",
                borderColor: colors.BLUEGREY[700],
                borderWidth: 2,
              }}
            >
              <Header data={headerData} />
              <Grid
                container
                container
                direction="row"
                justify="space-between"
                style={{
                  padding: 20,
                }}
              >
                <Grid item>{renderReportColumn("Temperature")}</Grid>
                <Grid item style={{ marginLeft: 10 }}>
                  {renderReportColumn("Humidity")}
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

const renderReportColumn = (heading) => {
  return (
    <div
      style={{
        border: true,
        borderStyle: "solid",
        borderColor: colors.BLUEGREY[700],
        borderWidth: 1,
      }}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Typography variant="h6">{heading}</Typography>
        </Grid>
        <Grid item>DATA CHART</Grid>
        <Grid item>ALERT CHART</Grid>
        <Grid item>TABLE</Grid>
      </Grid>
    </div>
  );
};
