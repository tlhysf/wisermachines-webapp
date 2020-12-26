import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "./Card";
import CardWithAnimation from "./CardWithAnimation";

import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import PowerIcon from "@material-ui/icons/Power";
import FlashOnOutlinedIcon from "@material-ui/icons/FlashOnOutlined";

import colors from "../../../../utils/colors";

export default function MachineDetailsRow1(props) {
  const {
    liveData,
    timeSinceLastUpdate,
    currentNow,
    lastUpdateTimestamp,
    stateNow,
    stateNowDuration,
    unitsConsumed,
    timeFilter,
  } = props.data;

  const updateStatus = { liveData, timeSinceLastUpdate };

  const stateRightNow = {
    icon:
      stateNow === "ON" ? (
        <PlayCircleFilledIcon
          size="small"
          style={{ color: colors.GREEN[700] }}
        />
      ) : stateNow === "IDLE" ? (
        <PauseCircleFilledIcon
          size="small"
          style={{ color: colors.TEAL[700] }}
        />
      ) : (
        <CancelIcon size="small" style={{ color: colors.RED[700] }} />
      ),
    values: {
      primary: stateNow,
      secondary: stateNowDuration,
    },
  };

  const currentRightNow = {
    icon: (
      <FlashOnOutlinedIcon size="small" style={{ color: colors.BLUE[700] }} />
    ),
    values: {
      primary: currentNow + " A",
      secondary: lastUpdateTimestamp,
    },
  };

  const unitsUntilNow = {
    icon: <PowerIcon size="small" style={{ color: colors.PURPLE[700] }} />,
    values: {
      primary: unitsConsumed + " kwh",
      secondary: timeFilter,
    },
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item md={3} xs={12}>
        <CardWithAnimation data={updateStatus} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Card data={stateRightNow} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Card data={currentRightNow} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Card data={unitsUntilNow} />
      </Grid>
    </Grid>
  );
}
