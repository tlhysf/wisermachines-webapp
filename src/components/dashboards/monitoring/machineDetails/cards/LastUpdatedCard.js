import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ButtonBase from "@material-ui/core/ButtonBase";
import Loader from "react-loader-spinner";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { smallCard } from "../../../../../utils/styles";
import colors from "../../../../../utils/colors";

const LastUpdatedCard = (props) => {
  const { timeSinceLastUpdate, liveData } = props.data;

  const updateIconRender =
    liveData !== null ? (
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
      {liveData !== null ? "Receiving Real-time Updates..." : "Last Updated: "}
    </Typography>
  );

  const timeSinceLastUpdateRender = (
    <Typography
      align="center"
      variant="body2"
      style={{ color: colors.BLUEGREY[800] }}
    >
      {liveData !== null ? null : timeSinceLastUpdate}
    </Typography>
  );

  return (
    <ButtonBase style={{ height: "100%", width: "100%" }}>
      <Grid
        container
        component={Paper}
        direction="row"
        justify="center"
        alignItems="center"
        elevation={2}
        style={{ padding: 3 }}
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
                {timeSinceLastUpdateRender}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </ButtonBase>
  );
};

export default LastUpdatedCard;
