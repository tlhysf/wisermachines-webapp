import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Tooltip from "@material-ui/core/Tooltip";

import Card, { CardWithImage } from "./cards/Card";
// import CostAndUnitsCard from "./cards/CostAndUnitsCard";

import LastUpdatedCard from "../../../common/LastUpdatedCard";

import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import PowerIcon from "@material-ui/icons/Power";
import FlashOnOutlinedIcon from "@material-ui/icons/FlashOnOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import BuildIcon from "@material-ui/icons/Build";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SpeedIcon from "@material-ui/icons/Speed";
import OpacityIcon from "@material-ui/icons/Opacity";

import colors from "../../../../utils/colors";
// import { isNotEmpty } from "../../../../utils/validation";

const animationDuration = 200;

const iconHeight = 40;

export default function CardsContainer(props) {
  const {
    unitsConsumed,
    timeFilter,
    temperatureNow,
    humidityNow,
    offLoadHours,
    onLoadHours,
    machineProfile,
  } = props.data;

  const maxLoadValue = Number.isInteger(machineProfile.max_load)
    ? machineProfile.max_load
    : "Unknown";

  // ********** Row 2 **********

  const unitsData = {
    icon: (
      <PowerIcon
        size="small"
        style={{ color: colors.INDIGO[700], height: iconHeight }}
      />
    ),
    values: {
      primary: unitsConsumed + " kWh",
      secondary: timeFilter,
    },
  };

  const calculateCost = (units) => {
    const costPerUnit = 19.74; // PKR per KWH
    let total = String((unitsConsumed * costPerUnit).toFixed(0));

    if (total.length > 3) {
      total =
        total.substr(0, total.length - 3) +
        "," +
        total.substr(total.length - 3);
    }
    return total;
  };

  const costData = {
    icon: (
      <AttachMoneyIcon
        size="small"
        style={{ color: colors.GREEN[700], height: iconHeight }}
      />
    ),
    values: {
      primary: "Rs. " + calculateCost(unitsConsumed),
      secondary: timeFilter,
    },
  };

  const maxLoadData = {
    icon: (
      <FitnessCenterIcon
        size="small"
        style={{ color: colors.TEAL[700], height: iconHeight }}
      />
    ),
    values: {
      primary: maxLoadValue,
      secondary: "Amperes",
    },
  };

  const renderRow2 = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grow
        in={true}
        {...{ timeout: animationDuration + 0 * animationDuration }}
      >
        <Tooltip title="Maximum Load" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={maxLoadData} />
          </Grid>
        </Tooltip>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Tooltip title="Units Consumed" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={unitsData} />
          </Grid>
        </Tooltip>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 2 * animationDuration }}
      >
        <Tooltip title="Electricity Cost" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={costData} />
          </Grid>
        </Tooltip>
      </Grow>
    </Grid>
  );

  // ********** Row 3 **********
  const hrsTillNextService = {
    icon: (
      <BuildIcon
        size="small"
        style={{ color: colors.CYAN[700], height: iconHeight }}
      />
    ),
    values: {
      primary: "Unknown",
      secondary: "Hours",
    },
  };

  // onLoadHours,
  const loadedHours = {
    icon: (
      <AccessTimeIcon
        size="small"
        style={{ color: colors.LIGHTGREEN[700], height: iconHeight }}
      />
    ),
    values: {
      primary: onLoadHours,
      secondary: "Hours",
    },
  };

  // offLoadHours
  const unLoadedHours = {
    icon: (
      <AccessTimeIcon
        size="small"
        style={{ color: colors.ORANGE[700], height: iconHeight }}
      />
    ),
    values: {
      primary: offLoadHours,
      secondary: "Hours",
    },
  };

  const renderRow3 = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grow
        in={true}
        {...{ timeout: animationDuration + 0 * animationDuration }}
      >
        <Tooltip title="Hours Till Next Service" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={hrsTillNextService} />
          </Grid>
        </Tooltip>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Tooltip title="Total Loaded Hours" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={loadedHours} />
          </Grid>
        </Tooltip>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 2 * animationDuration }}
      >
        <Tooltip title="Total Un-Loaded Hours" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={unLoadedHours} />
          </Grid>
        </Tooltip>
      </Grow>
    </Grid>
  );

  // ********** Row 4 **********
  const temperatureNowData = {
    icon: (
      <SpeedIcon
        size="small"
        style={{ color: colors.RED[500], height: iconHeight }}
      />
    ),
    values: {
      primary: temperatureNow,
      secondary: "\u00B0C",
    },
  };

  const humidityNowData = {
    icon: (
      <OpacityIcon
        size="small"
        style={{ color: colors.BLUE[500], height: iconHeight }}
      />
    ),
    values: {
      primary: humidityNow,
      secondary: "%RH",
    },
  };

  const pressureNowData = {
    icon: (
      <SpeedIcon
        size="small"
        style={{ color: colors.GREEN[500], height: iconHeight }}
      />
    ),
    values: {
      primary: "Unknown",
      secondary: "psi",
    },
  };

  const renderRow4 = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grow
        in={true}
        {...{ timeout: animationDuration + 0 * animationDuration }}
      >
        <Tooltip title="Temperature" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={temperatureNowData} />
          </Grid>
        </Tooltip>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Tooltip title="Humidity" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={humidityNowData} />
          </Grid>
        </Tooltip>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 2 * animationDuration }}
      >
        <Tooltip title="Pressure" placement="top">
          <Grid item md={4} sm={6} xs={12}>
            <Card data={pressureNowData} />
          </Grid>
        </Tooltip>
      </Grow>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {renderRow2}
      </Grid>
      <Grid item xs={12}>
        {renderRow3}
      </Grid>
      <Grid item xs={12}>
        {renderRow4}
      </Grid>
    </Grid>
  );
}

export const CardsContainerRow1 = (props) => {
  const {
    liveData,
    currentNow,
    lastUpdateTimestamp,
    stateNow,
    stateNowDuration,
  } = props.data;

  const logo = { src: "/img/Sakoon-logo-web.png", alt: "logo" };

  const updateStatus = { liveData, lastUpdateTimestamp };

  const stateRightNow = {
    icon:
      stateNow === "ON" ? (
        <PlayCircleFilledIcon
          style={{ color: colors.GREEN[700], height: iconHeight }}
        />
      ) : stateNow === "IDLE" ? (
        <PauseCircleFilledIcon
          style={{ color: colors.BLUE[700], height: iconHeight }}
        />
      ) : (
        <CancelIcon style={{ color: colors.RED[700], height: iconHeight }} />
      ),
    values: {
      primary: stateNow,
      secondary: stateNowDuration,
    },
  };

  const currentRightNow = {
    icon: (
      <FlashOnOutlinedIcon
        size="small"
        style={{ color: colors.PURPLE[700], height: iconHeight }}
      />
    ),
    values: {
      primary: currentNow + " A",
      secondary: lastUpdateTimestamp,
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grow
            in={true}
            {...{ timeout: animationDuration + 0 * animationDuration }}
          >
            <Tooltip title={logo.alt} placement="top">
              <Grid item md={3} sm={6} xs={12}>
                <CardWithImage src={logo.src} alt={logo.alt} />
              </Grid>
            </Tooltip>
          </Grow>
          <Grow
            in={true}
            {...{ timeout: animationDuration + 1 * animationDuration }}
          >
            <Tooltip title="Update Status" placement="top">
              <Grid item md={3} sm={6} xs={12}>
                <LastUpdatedCard data={updateStatus} />
              </Grid>
            </Tooltip>
          </Grow>
          <Grow
            in={true}
            {...{ timeout: animationDuration + 2 * animationDuration }}
          >
            <Tooltip title="Machine Status" placement="top">
              <Grid item md={3} sm={6} xs={12}>
                <Card data={stateRightNow} />
              </Grid>
            </Tooltip>
          </Grow>
          <Grow
            in={true}
            {...{ timeout: animationDuration + 3 * animationDuration }}
          >
            <Tooltip title="Machine Current" placement="top">
              <Grid item md={3} sm={6} xs={12}>
                <Card data={currentRightNow} />
              </Grid>
            </Tooltip>
          </Grow>
        </Grid>
      </Grid>
    </Grid>
  );
};
