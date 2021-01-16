import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import TypoGraphy from "@material-ui/core/Typography";

// import { FaTemperatureLow } from "react-icons/fa";
import ComputerIcon from "@material-ui/icons/Computer";

import colors from "../../utils/colors";

import { machineMonitoring, environmentMonitoring } from "../../routes/Routes";

const styles = {
  root: { height: "80vh" },
  container: {
    height: "100%",
    width: "100%",
  },
  card: {
    height: 150,
    width: 300,
    display: "flex",
    alignItems: "center",
  },
};

const handleClick = (e, module) => {
  const url = "/" + module + "/";
  window.location.href = url;
};

const renderCard = (module, icon) => {
  const color = colors.TEAL[700];
  return (
    <Grid item>
      <ButtonBase onClick={(e) => handleClick(e, module)}>
        <Paper style={styles.card} elevation={2}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item style={{ color: color }}>
              {icon}
            </Grid>
            <Grid item xs={12}>
              <TypoGraphy variant="overline" style={{ color: color }}>
                {module.split("-").join(" ")}
              </TypoGraphy>
            </Grid>
          </Grid>
        </Paper>
      </ButtonBase>
    </Grid>
  );
};

const Home = () => {
  return (
    <Grid container style={styles.root}>
      <Grid item style={styles.container}>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={styles.container}
          spacing={4}
        >
          {renderCard(machineMonitoring, <ComputerIcon />)}
          {renderCard(environmentMonitoring, <ComputerIcon />)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
