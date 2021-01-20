import React from "react";

import Loader from "react-loader-spinner";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

import { common, smallCard } from "../../utils/styles";
import colors from "../../utils/colors";
import { isNotEmpty } from "../../utils/validation";

const useStyles = makeStyles((theme) => common(theme));

const LastUpdatedCard = (props) => {
  const classes = useStyles();

  const { lastUpdateTimestamp, liveData } = props.data;

  const isLiveData = isNotEmpty(liveData);

  // console.log(isLiveData, lastUpdateTimestamp);

  const updateIconRender = isLiveData ? (
    <Loader type="Bars" height={20} color={colors.TEAL[700]} />
  ) : (
    <CheckCircleIcon
      style={{
        width: 20,
        color: colors.TEAL[700],
      }}
    />
  );

  const updateMessegeRender = (
    <Typography
      align="center"
      variant="body2"
      style={{ color: colors.BLUEGREY[600] }}
    >
      {isLiveData ? "Receiving Real-time Updates..." : "Last Updated: "}
    </Typography>
  );

  const lastUpdateTimestampRender = (
    <Typography
      align="center"
      variant="body2"
      style={{ color: colors.BLUEGREY[800] }}
    >
      {isLiveData ? null : lastUpdateTimestamp}
    </Typography>
  );

  return (
    <Grid
      container
      component={Paper}
      direction="row"
      justify="center"
      alignItems="center"
      elevation={2}
      style={{ padding: 12, height: "100%" }}
      className={classes.cardHover}
    >
      <Grid item xs={2}>
        <Paper style={smallCard.iconPaper} elevation={0}>
          {updateIconRender}
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper style={smallCard.textPaper} elevation={0}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs="auto">
              {updateMessegeRender}
            </Grid>
            <Grid item xs="auto">
              {lastUpdateTimestampRender}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LastUpdatedCard;
