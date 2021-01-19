import React from "react";
import Routes from "../../routes/Routes";

// Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// Custom Components
import Sidebar from "./Sidebar";
import OpenSideBarButton from "./OpenSideBarButton";
import AppBarMenu from "./AppBarMenu";

import { makeStyles } from "@material-ui/core/styles";
import { layoutStyle } from "../../utils/styles";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const General = (props) => {
  const classes = useStyles();

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  return props.signedin ? (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* Show menu button in Appbar for smaller screen sizes */}
          <OpenSideBarButton screen="mobile" />

          <Tooltip title="WiserMachines" placement="right">
            <Button
              edge="start"
              onClick={(e) => {
                handleLogoClick();
              }}
            >
              <img
                src="/img/logo.png"
                alt="WiserMachines"
                className={classes.logo}
              />
            </Button>
          </Tooltip>

          {/* Push all content after this point to the right  */}
          <div className={classes.grow}></div>
          <AppBarMenu thisUser={props.thisUser} />
        </Toolbar>
      </AppBar>

      <Sidebar />

      <main className={classes.content}>
        <div style={{ paddingTop: 56 }}></div>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Routes {...props} />
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  ) : (
    <Routes {...props} />
  );
};

export default General;
