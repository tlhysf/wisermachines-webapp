import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import colors from "../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";
import { common as styles } from "../../utils/styles";

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
    <Button
      className={classes.cardHover}
      variant="contained"
      elevation={2}
      style={{ backgroundColor: "white", textTransform: "none", padding: 12 }}
      disableRipple
      disableFocusRipple
      fullWidth
      startIcon={
        <span
          style={{
            color: values.color,
            padding: 5,
          }}
        >
          {icon}
        </span>
      }
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography
            align="left"
            variant="subtitle2"
            style={{ color: primaryTextColor }}
          >
            {values.primary}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            align="left"
            variant="subtitle1"
            style={{ color: secondaryTextColor }}
          >
            {values.secondary}
          </Typography>
        </Grid>
      </Grid>
    </Button>
  );
}
