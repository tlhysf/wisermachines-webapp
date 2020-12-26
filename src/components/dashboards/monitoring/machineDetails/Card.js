import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { smallCard } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

export default function Card(props) {
  const { icon, values } = props.data;

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
          {icon}
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper style={smallCard.textPaper} elevation={0}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item xs={"auto"}>
              <Typography align="center" variant="h5">
                {values.primary}
              </Typography>
            </Grid>
            <Grid item xs={"auto"}>
              <Typography
                align="center"
                variant="body2"
                style={{ color: colors.BLUEGREY[500] }}
              >
                {values.secondary}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
