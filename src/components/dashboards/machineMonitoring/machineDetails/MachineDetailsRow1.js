import React from "react";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

import Card from "./cards/Card";
import LastUpdatedCard from "../../../common/LastUpdatedCard";

import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import PowerIcon from "@material-ui/icons/Power";
import FlashOnOutlinedIcon from "@material-ui/icons/FlashOnOutlined";

import colors from "../../../../utils/colors";

const animationDuration = 500;

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
          style={{ color: colors.GREEN[700], height: 20 }}
        />
      ) : stateNow === "IDLE" ? (
        <PauseCircleFilledIcon
          style={{ color: colors.TEAL[700], height: 20 }}
        />
      ) : (
        <CancelIcon style={{ color: colors.RED[700], height: 20 }} />
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
        style={{ color: colors.INDIGO[700], height: 20 }}
      />
    ),
    values: {
      primary: currentNow + " A",
      secondary: lastUpdateTimestamp,
    },
  };

  const unitsUntilNow = {
    icon: (
      <PowerIcon
        size="small"
        style={{ color: colors.PURPLE[700], height: 20 }}
      />
    ),
    values: {
      primary: unitsConsumed + " kwh",
      secondary: timeFilter,
    },
  };

  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 0 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <LastUpdatedCard data={updateStatus} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 1 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <Card data={stateRightNow} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 3 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <Card data={currentRightNow} />
        </Grid>
      </Grow>
      <Grow
        in={true}
        {...{ timeout: animationDuration + 4 * animationDuration }}
      >
        <Grid item md={3} xs={12}>
          <Card data={unitsUntilNow} />
        </Grid>
      </Grow>
    </Grid>
  );
}
