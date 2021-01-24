import React from "react";

import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { common } from "../../../../utils/styles";
import { makeStyles } from "@material-ui/core/styles";
import colors from "../../../../utils/colors";

const useStyles = makeStyles((theme) => common(theme));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

const styles = {
  selectedButton: {
    color: "white",
    backgroundColor: colors.TEAL[700],
    // width: 130,
  },
  unSelectedButton: {
    color: colors.TEAL[700],
    backgroundColor: "white",
    // width: 130,
  },
  dialogBoxContainer: {
    backgroundColor: colors.BLUEGREY[100],
    padding: 20,
  },
  dialogBox: {
    backgroundColor: "rgb(0,0,0,0)",
  },
  cardsContainer: {
    // width: 300,
    paddingTop: 10,
  },
  card: { paddingBottom: 10 },
  cardContentContainer: {
    padding: 5,
  },
};

const timestampToDate = (timestamp) => {
  const dateTime = new Date(timestamp);
  return dateTime.toLocaleTimeString() + " - " + dateTime.toLocaleDateString();
};

export default function AlertsPopover(props) {
  const classes = useStyles();

  const {
    humidity,
    humidityAlerts,
    temperature,
    temperatureAlerts,
    timestamps,
  } = props.data;

  // const [data, setData] = React.useState({
  //   humidity: [],
  //   humidityAlerts: [],
  //   temperature: [],
  //   temperatureAlerts: [],
  //   timestamps: [],
  // });

  // const {
  //   humidity,
  //   humidityAlerts,
  //   temperature,
  //   temperatureAlerts,
  //   timestamps,
  // } = data;

  // console.log(data);

  // React.useEffect(() => {
  //   const {
  //     humidity,
  //     humidityAlerts,
  //     temperature,
  //     temperatureAlerts,
  //     timestamps,
  //   } = props.data;

  //   setData({
  //     humidity,
  //     humidityAlerts,
  //     temperature,
  //     temperatureAlerts,
  //     timestamps,
  //   });
  // }, [props.data]);

  const [selectedOption, setSelectedOption] = React.useState({
    temperature: true,
    humidity: false,
  });

  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDialogButton = (e) => {
    setOpenDialog(!openDialog);
  };

  const handleButtonGroup = (e) => {
    if (e.currentTarget.id === "temperature") {
      setSelectedOption({
        temperature: true,
        humidity: false,
      });
    }
    if (e.currentTarget.id === "humidity") {
      setSelectedOption({
        temperature: false,
        humidity: true,
      });
    }
  };

  const low = (
    <ArrowDownwardIcon style={{ width: 20, color: colors.BLUE[600] }} />
  );
  const high = (
    <ArrowUpwardIcon style={{ width: 20, color: colors.RED[600] }} />
  );

  let temperatureAlertsList = [];
  temperatureAlerts.map((item, index) => {
    if (item === -1) {
      temperatureAlertsList.push({
        alert: "Low",
        value: temperature[index],
        time: timestampToDate(timestamps[index]),
        icon: low,
        color: colors.BLUE[600],
      });
    } else if (item === 1) {
      temperatureAlertsList.push({
        alert: "High",
        value: temperature[index],
        time: timestampToDate(timestamps[index]),
        icon: high,
        color: colors.RED[600],
      });
    }
    return item;
  });
  temperatureAlertsList.reverse();

  let humidityAlertsList = [];
  humidityAlerts.map((item, index) => {
    if (item === -1) {
      humidityAlertsList.push({
        alert: "Low",
        value: humidity[index],
        time: timestampToDate(timestamps[index]),
        color: colors.BLUE[600],
        icon: low,
      });
    } else if (item === 1) {
      humidityAlertsList.push({
        alert: "High",
        value: humidity[index],
        time: timestampToDate(timestamps[index]),
        color: colors.RED[600],
        icon: high,
      });
    }
    return item;
  });
  humidityAlertsList.reverse();

  const renderButtonGroup = (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={6}>
        <Button
          id="temperature"
          variant="text"
          fullWidth
          onClick={(e) => handleButtonGroup(e)}
          // disableRipple
          style={
            selectedOption.temperature
              ? styles.selectedButton
              : styles.unSelectedButton
          }
        >
          <Typography variant="caption">Temperature</Typography>
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="text"
          id="humidity"
          fullWidth
          onClick={(e) => handleButtonGroup(e)}
          // disableRipple
          style={
            selectedOption.humidity
              ? styles.selectedButton
              : styles.unSelectedButton
          }
        >
          <Typography variant="caption">Humidity</Typography>
        </Button>
      </Grid>
    </Grid>
  );

  const renderCard = (item, index, unit) => (
    <Grid item xs={12} key={index} style={styles.card}>
      <Button
        variant="contained"
        style={{ backgroundColor: "white" }}
        fullWidth
        endIcon={item.icon}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={styles.cardContentContainer}
        >
          <Grid item xs={12}>
            <Typography
              variant="body1"
              align="left"
              gutterBottom
              style={{ color: colors.BLUEGREY[600] }}
            >
              {item.value}
              {unit}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              align="left"
              style={{
                color: colors.BLUEGREY[400],
                // fontStretch: "ultra-condensed",
              }}
            >
              {item.time}
            </Typography>
          </Grid>
        </Grid>
      </Button>
    </Grid>
  );

  const renderAllCards = (
    <Grid container direction="column" justify="center" alignItems="stretch">
      {selectedOption.temperature
        ? temperatureAlertsList.map((item, index) =>
            renderCard(item, index, " \u00B0C")
          )
        : null}
      {selectedOption.humidity
        ? humidityAlertsList.map((item, index) =>
            renderCard(item, index, " %RH")
          )
        : null}
    </Grid>
  );

  return (
    <>
      <Tooltip placement="top" title="Alerts">
        <Button
          className={classes.button}
          variant="contained"
          onClick={(e) => handleDialogButton(e)}
        >
          <NotificationsNoneOutlinedIcon
            className={classes.iconInsideButton}
            style={{ color: colors.TEAL[700] }}
          />
        </Button>
      </Tooltip>

      <Dialog
        open={openDialog}
        onBackdropClick={(e) => setOpenDialog(false)}
        style={styles.dialogBox}
        scroll="paper"
        TransitionComponent={Transition}
      >
        <DialogTitle>{renderButtonGroup}</DialogTitle>
        <DialogContent dividers={true} style={styles.dialogBoxContainer}>
          <div style={styles.cardsContainer}>{renderAllCards}</div>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="text"
            onClick={(e) => handleDialogButton(e)}
          >
            <Typography variant="body2">Close</Typography>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
