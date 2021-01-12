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

// Auth
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
  const { signedin } = props;

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={signin}
          render={(props) =>
            signedin ? <Redirect to={home} /> : <Signin {...props} />
          }
        />

        <Route
          exact
          path={home}
          render={(props) =>
            signedin ? <Redirect to={workshops} /> : <Redirect to={signin} />
          }
        />

        <Route
          exact
          path={monitoring}
          render={(props) =>
            signedin ? <Redirect to={workshops} /> : <Redirect to={signin} />
          }
        />

        <Route
          exact
          path={workshops}
          render={(props) =>
            signedin ? <Workshops {...props} /> : <Redirect to={signin} />
          }
        />

        <Route
          exact
          path={zones}
          render={(props) =>
            signedin ? <Zones {...props} /> : <Redirect to={signin} />
          }
        />

        <Route
          exact
          path={machinesAndNodes}
          render={(props) =>
            signedin ? (
              <MachinesAndNodes {...props} />
            ) : (
              <Redirect to={signin} />
            )
          }
        />

        <Route
          exact
          path={machineDetails}
          render={(props) =>
            signedin ? <MachinesDetails {...props} /> : <Redirect to={signin} />
          }
        />

        <Route
          exact
          path={pageNotFound}
          render={(props) =>
            signedin ? <PageNotFound {...props} /> : <Redirect to={signin} />
          }
        />

        {/* Has to be rendered at the very end */}
        <Redirect from="*" to={pageNotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;
