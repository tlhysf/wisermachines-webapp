import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import colors from "../../utils/colors";

const PageNotFound = () => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      style={{ height: "50vh" }}
    >
      <Grid item xs={12}>
        <Typography
          align="center"
          variant="h4"
          style={{ color: colors.BLUEGREY[400] }}
        >
          404: Page Not Found
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
