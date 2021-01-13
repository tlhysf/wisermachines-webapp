import React from "react";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grow from "@material-ui/core/Grow";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import { makeStyles } from "@material-ui/core/styles";
import { common } from "../../utils/styles";
import colors from "../../utils/colors";

const animationDuration = 200;

const useStyles = makeStyles((theme) => common(theme));

export default function AlertCard(props) {
  const classes = useStyles();

  return (
    <Grow in={true} {...{ timeout: animationDuration + 9 * animationDuration }}>
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          spacing={1}
          component={Paper}
          elevation={2}
          className={classes.cardHover}
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
