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
      style={{ padding: 12 }}
    >
      <Grid item xs={2} style={{ color: values.color }}>
        {icon}
      </Grid>
      <Grid item xs={10}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ paddingLeft: 8 }}
        >
          <Grid item xs={12}>
            <Typography
              align="left"
              variant="caption"
              style={{ color: colors.BLUEGREY[500] }}
            >
              {values.primary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="left"
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
