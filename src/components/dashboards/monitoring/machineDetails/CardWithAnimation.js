import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Loader from "react-loader-spinner";
import OfflinePinIcon from "@material-ui/icons/OfflinePin";
import { smallCard } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

const CardWithAnimation = (props) => {
  const { timeSinceLastUpdate } = props.data;

  const liveData = false;

  const updateIconRender = liveData ? (
    <Loader type="Bars" height={20} />
  ) : (
    <OfflinePinIcon />
  );

  const updateMessegeRender = (
    <Typography
      align="center"
      variant="body2"
      style={{ color: colors.BLUEGREY[500] }}
    >
      {liveData ? "Receiving Real-time Updates..." : "Last Updated: "}
    </Typography>
  );

  const timeSinceLastUpdateRender = (
    <Typography
      align="center"
      variant="body2"
      style={{ color: colors.BLUEGREY[800] }}
    >
      {liveData ? null : timeSinceLastUpdate}
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
            <Grid item xs={"auto"}>
              {updateMessegeRender}
            </Grid>
            <Grid item xs={"auto"}>
              {timeSinceLastUpdateRender}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CardWithAnimation;
