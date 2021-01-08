import React from "react";
import Loader from "react-loader-spinner";
import Grid from "@material-ui/core/Grid";
import colors from "../../utils/colors";

export default function Spinner() {
  return (
    <Grid item xs={12}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "50vh" }}
      >
        <Grid item>
          <Loader type="Bars" height={50} width={50} color={colors.TEAL[500]} />
        </Grid>
      </Grid>
    </Grid>
  );
}
