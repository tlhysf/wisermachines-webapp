import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import colors from "../../utils/colors";

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
      style={{ padding: 12, height: 64 }}
    >
      <Grid item style={{ color: values.color }} xs={2}>
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="body2"
              style={{ color: colors.BLUEGREY[500] }}
            >
              {values.primary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="body2"
              style={{ color: values.color }}
            >
              {values.secondary}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
