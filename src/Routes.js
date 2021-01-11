import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import PageNotFound from "./components/errorScreens/PageNotFound";
import Workshops from "./components/dashboards/monitoring/workshops/Workshops";
import Zones from "./components/dashboards/monitoring/zones/Zones";
import MachinesDetails from "./components/dashboards/monitoring/machineDetails/MachineDetails";
import MachinesAndNodes from "./components/dashboards/monitoring/machinesAndNodes/MachinesAndNodes";
import Signin from "./components/auth/Signin";

import keys from "./utils/keys";

// *** Paths ***

// auth
const signin = "/signin";

// Error screens
const pageNotFound = "/pagenotfound";
// const underConstruction = "/commingsoon";

// Monitoring
export const home = "/";
export const monitoring = home + "monitoring/";
export const workshopAlias = keys.navigationList.monitoring[1];
export const workshops = monitoring + workshopAlias + "/";
export const zones = workshops + ":workshopID~:workshopName/";
export const machinesAndNodes = zones + ":zoneID~:zoneName/";
export const machineDetails = machinesAndNodes + ":machineID~:machineName/";

export const makePath = (currentPath, ID, name) => {
  const PrimarySeparator = "/";
  const SecondarySeparator = "~";

  const currentPathTrimmed = currentPath.endsWith("/")
    ? currentPath.slice(0, -1)
    : currentPath;

  const nameWithoutSpaces = name.split(" ").join("_");

  return (
    currentPathTrimmed +
    PrimarySeparator +
    ID +
    SecondarySeparator +
    nameWithoutSpaces
  );
};

const Routes = (props) => {
  return (
    <Router>
      {props.signedin ? (
        <Switch>
          <Route exact path={signin}>
            <Redirect to={home} />
          </Route>
          <Route exact path={home}>
            <Redirect to={workshops} />
          </Route>
          <Route exact path={monitoring}>
            <Redirect to={workshops} />
          </Route>
          <Route
            exact
            path={workshops}
            render={(props) => <Workshops {...props} />}
          />
          <Route exact path={zones} render={(props) => <Zones {...props} />} />
          <Route
            exact
            path={machinesAndNodes}
            render={(props) => <MachinesAndNodes {...props} />}
          />
          <Route
            exact
            path={machineDetails}
            render={(props) => <MachinesDetails {...props} />}
          />
          <Route
            exact
            path={pageNotFound}
            render={(props) => <PageNotFound {...props} />}
          />
          {/* Has to be rendered at the very end */}
          <Redirect from="*" to={pageNotFound} />
        </Switch>
      ) : (
        <Switch>
          <Route
            exact
            path={signin}
            render={(props) => <Signin {...props} />}
          />
          <Redirect from="*" to={signin} />
        </Switch>
      )}
    </Router>
  );
};

export default Routes;
