import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import colors from "../../../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";
import { common as styles } from "../../../../utils/styles";

const useStyles = makeStyles((theme) => styles(theme));

export default function Card(props) {
  const classes = useStyles();

  const { icon, values } = props.data;

  const primaryTextColor =
    values.colored === "primary" ? values.color : colors.BLUEGREY[500];

  const secondaryTextColor =
    values.colored === null || values.colored === "secondary"
      ? values.colored
      : colors.BLUEGREY[500];

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
      <Grid
        item
        style={{
          color: values.color,
          padding: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {icon}
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="h6"
              style={{ color: primaryTextColor, paddingLeft: 10 }}
            >
              {values.primary}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              align="center"
              variant="body2"
              style={{ color: secondaryTextColor }}
            >
              {values.secondary}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
