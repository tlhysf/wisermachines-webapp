import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import Card from "./cards/Card";
import CostAndUnitsCard from "./cards/CostAndUnitsCard";

import LastUpdatedCard from "../../../common/LastUpdatedCard";

import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import PowerIcon from "@material-ui/icons/Power";
import FlashOnOutlinedIcon from "@material-ui/icons/FlashOnOutlined";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import colors from "../../../../utils/colors";

const animationDuration = 200;

const iconHeight = 40;

export default function MachineDetailsRow1(props) {
  const {
    liveData,
    currentNow,
    lastUpdateTimestamp,
    stateNow,
    stateNowDuration,
    unitsConsumed,
    timeFilter,
  } = props.data;

  const updateStatus = { liveData, lastUpdateTimestamp };

  const stateRightNow = {
    icon:
      stateNow === "ON" ? (
        <PlayCircleFilledIcon
          style={{ color: colors.GREEN[700], height: iconHeight }}
        />
      ) : stateNow === "IDLE" ? (
        <PauseCircleFilledIcon
          style={{ color: colors.TEAL[700], height: iconHeight }}
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
        style={{ color: colors.INDIGO[700], height: iconHeight }}
      />
    ),
    values: {
      primary: currentNow + " A",
      secondary: lastUpdateTimestamp,
    },
  };

  const unitsData = {
    icon: (
      <PowerIcon
        size="small"
        style={{ color: colors.PURPLE[700], height: iconHeight }}
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
      primary: calculateCost(unitsConsumed) + " PKR",
      secondary: timeFilter,
    },
  };

  const renderRow1 = (
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
        <Grid item md={4} sm={6} xs={12}>
          <LastUpdatedCard data={updateStatus} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Card data={stateRightNow} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 3 * animationDuration }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Card data={currentRightNow} />
        </Grid>
      </Grow>
      {/* <Grow
    in={true}
    {...{ timeout: animationDuration + 4 * animationDuration }}
  >
    <Grid item md={3} sm={6} xs={12}>
      <CostAndUnitsCard costData={costData} unitsData={unitsData} />
    </Grid>
  </Grow> */}
    </Grid>
  );

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
        <Grid item md={4} sm={6} xs={12}>
          <Card data={stateRightNow} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Card data={stateRightNow} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 3 * animationDuration }}
      >
        <Grid item md={4} sm={6} xs={12}>
          <Card data={currentRightNow} />
        </Grid>
      </Grow>
    </Grid>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {renderRow1}
      </Grid>
      <Grid item xs={12}>
        {renderRow2}
      </Grid>
      <Grid item xs={12}>
        {renderRow1}
      </Grid>
    </Grid>
  );
}
