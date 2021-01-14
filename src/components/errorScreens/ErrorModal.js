import React from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const ErrorModal = ({ classes }) => {
  const errorCode = useSelector((state) => state.errors.errorCode);
  const errorMessage = useSelector((state) => state.errors.errorMessage);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    window.history.go(-1);
  };

  return (
    <Drawer
      open={errorCode !== null ? true : false}
      anchor="top"
      onClose={handleRefresh}
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
              <ButtonGroup>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={(e) => handleRefresh()}
                  color="primary"
                >
                  Refresh
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={(e) => handleGoBack()}
                  color="primary"
                >
                  Go Back
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default ErrorModal;
