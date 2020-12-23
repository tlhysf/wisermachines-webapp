import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "./Card";

import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import PowerIcon from "@material-ui/icons/Power";
import FlashOnOutlinedIcon from "@material-ui/icons/FlashOnOutlined";
import FeedbackIcon from "@material-ui/icons/Feedback";

export default function MachineDetailsRow1(props) {
  const {
    currentNow,
    stateNow,
    stateNowTime,
    unitsConsumed,
    timeFilter,
  } = props.data;

  const stateRightNow = {
    icon:
      stateNow === "ON" ? (
        <PlayCircleFilledIcon size="small" color="secondary" />
      ) : stateNow === "IDLE" ? (
        <PauseCircleFilledIcon size="small" color="action" />
      ) : (
        <CancelIcon size="small" color="error" />
      ),
    values: {
      primary: stateNow,
      secondary: stateNowTime,
    },
  };

  const currentRightNow = {
    icon: <FlashOnOutlinedIcon size="small" color="primary" />,
    values: {
      primary: currentNow + " A",
      secondary: "5 Seconds Ago",
    },
  };

  const unitsUntilNow = {
    icon: <PowerIcon size="small" color="primary" />,
    values: {
      primary: unitsConsumed + " kwh",
      secondary: timeFilter,
    },
  };

  const alertUntilNow = {
    icon: <FeedbackIcon size="small" color="action" />,
    values: {
      primary: "0",
      secondary: timeFilter,
    },
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item md={3} xs={12}>
        <Card data={stateRightNow} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Card data={currentRightNow} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Card data={unitsUntilNow} />
      </Grid>
      <Grid item md={3} xs={12}>
        <Card data={alertUntilNow} />
      </Grid>
    </Grid>
  );
}
