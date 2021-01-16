import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import PageNotFound from "../components/errorScreens/PageNotFound";
import UnderConstruction from "../components/errorScreens/UnderConstruction";
import Signin from "../components/auth/Signin";
import Home from "../components/home/Home";

import { machineRoutes } from "./machineRoutes";
import { environmentRoutes } from "./environmentRoutes";

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

// *** Paths ***
export const home = "/";
export const signin = "/signin";
export const pageNotFound = "/pagenotfound";
export const underConstruction = "/comingsoon";

// Modules:
export const machineMonitoring = "Machine-Monitoring";
export const environment = "Environment-Monitoring";

const Routes = (props) => {
  const { signedin, thisUser } = props;

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
            signedin ? <Home {...props} /> : <Redirect to={signin} />
          }
        />

        <Route
          exact
          path={underConstruction}
          render={(props) =>
            signedin ? (
              <UnderConstruction {...props} />
            ) : (
              <Redirect to={signin} />
            )
          }
        />

        {machineRoutes(
          signedin,
          thisUser,
          machineMonitoring,
          signin,
          home,
          props
        ).filter((x) => x)}

        {environmentRoutes(
          signedin,
          thisUser,
          environment,
          signin,
          home,
          props
        ).filter((x) => x)}

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
