import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Dialog from "@material-ui/core/Dialog";

import colors from "../../utils/colors";

const animationDuration = 200;

export default function AlertCard(props) {
  const timeout = props.disableAnimation ? 0 : animationDuration;

  return (
    <Grow in={true} {...{ timeout: timeout }}>
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={1}
          component={Paper}
          elevation={2}
          // className={classes.cardHover}
          style={{
            backgroundColor: colors.BLUE[600],
            color: "white",
            padding: 10,
          }}
        >
          <Grid item>
            <InfoOutlinedIcon style={{ paddingTop: 4 }} />
          </Grid>
          <Grid item>
            <Typography variant="body1" align="center">
              {props.message}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  );
}

export const AlertDialog = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={(e) => props.onClose()}
      PaperProps={{ elevation: 0, style: { backgroundColor: "rgb(0,0,0,0)" } }}
    >
      <div style={{ padding: 20 }}>
        <AlertCard message={props.message} disableAnimation={true} />
      </div>
    </Dialog>
  );
};
