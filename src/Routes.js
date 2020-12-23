import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Workshops from "./components/dashboards/monitoring/workshops/Workshops";
import Zones from "./components/dashboards/monitoring/zones/Zones";
import MachinesDetails from "./components/dashboards/monitoring/machineDetails/MachineDetails";
import MachinesAndNodes from "./components/dashboards/monitoring/machinesAndNodes/MachinesAndNodes";

// Paths
export const home = "/";
export const monitoring = home + "monitoring/";
export const workshops = monitoring + "workshops/";
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

export const breadCrumbsList = {
  monitoring: [
    "monitoring",
    "workshops",
    "workshopName",
    "zoneName",
    "machineName",
  ],
};

const Routes = (props) => {
  return (
    <Router>
      <Switch>
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
      </Switch>
    </Router>
  );
};

export default Routes;
