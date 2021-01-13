import React from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ErrorModal = ({ classes }) => {
  const errorCode = useSelector((state) => state.errors.errorCode);
  const errorMessage = useSelector((state) => state.errors.errorMessage);

  const handleClose = () => {
    window.location.reload();
  };

  return (
    <Drawer
      open={errorCode !== null ? true : false}
      anchor="top"
      onClose={handleClose}
      type="temporary"
    >
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ width: "100vw", height: "100vh" }}
        spacing={0}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={6}
          >
            <Grid item>
              <Typography variant="h5" gutterBottom align="center">
                {errorCode}
              </Typography>
              <Typography variant="body1" gutterBottom align="center">
                {errorMessage}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                fullWidth
                variant="outlined"
                onClick={handleClose}
                color="primary"
              >
                Refresh
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default ErrorModal;
