import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const iconPaper = {
  padding: "5px 5px 5px 5px",
  // borderRadius: "5px 0px 0px 5px",
  display: "flex",
  justifyContent: "center",
  align: "center",
  backgroundColor: "transparent",
};

const textPaper = {
  padding: "5px 5px 5px 5px",
  display: "flex",
  justifyContent: "center",
  align: "center",
  backgroundColor: "transparent",
};

export default function Card(props) {
  const { icon, values } = props.data;

  return (
    <Grid
      container
      component={Paper}
      direction="row"
      justify="center"
      alignItems="center"
      elevation={0}
    >
      <Grid item xs={2}>
        <Paper style={iconPaper} elevation={0}>
          {icon}
        </Paper>
      </Grid>
      <Grid item xs={10}>
        <Paper style={textPaper} elevation={0}>
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
                style={{ color: "gray" }}
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
