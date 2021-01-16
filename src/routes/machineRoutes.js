import { Route, Redirect } from "react-router-dom";

import Workshops from "../components/dashboards/monitoring/workshops/Workshops";
import Zones from "../components/dashboards/monitoring/zones/Zones";
import MachinesDetails from "../components/dashboards/monitoring/machineDetails/MachineDetails";
import MachinesAndNodes from "../components/dashboards/monitoring/machinesAndNodes/MachinesAndNodes";

export const machineRoutes = (
  signedin,
  thisUser,
  machineMonitoring,
  signin,
  home
) => {
  const workshopAlias = thisUser.navigationAliases[0];

  const navigationList = [
    machineMonitoring,
    workshopAlias,
    "workshopName",
    "zoneName",
    "machineName",
  ];

  const root = home + machineMonitoring + "/";
  const workshops = root + workshopAlias + "/";
  const zones = workshops + ":workshopID~:workshopName/";
  const machinesAndNodes = zones + ":zoneID~:zoneName/";
  const machineDetails = machinesAndNodes + ":machineID~:machineName/";

  return [
    <Route
      key={Math.random()}
      exact
      path={root}
      render={() =>
        signedin ? <Redirect to={workshops} /> : <Redirect to={signin} />
      }
    />,

    <Route
      key={Math.random()}
      exact
      path={workshops}
      render={(props) =>
        signedin ? (
          <Workshops {...props} navigationList={navigationList} />
        ) : (
          <Redirect to={signin} />
        )
      }
    />,

    <Route
      key={Math.random()}
      exact
      path={zones}
      render={(props) =>
        signedin ? (
          <Zones {...props} navigationList={navigationList} />
        ) : (
          <Redirect to={signin} />
        )
      }
    />,

    <Route
      key={Math.random()}
      exact
      path={machinesAndNodes}
      render={(props) =>
        signedin ? (
          <MachinesAndNodes {...props} navigationList={navigationList} />
        ) : (
          <Redirect to={signin} />
        )
      }
    />,

    <Route
      key={Math.random()}
      exact
      path={machineDetails}
      render={(props) =>
        signedin ? (
          <MachinesDetails {...props} navigationList={navigationList} />
        ) : (
          <Redirect to={signin} />
        )
      }
    />,
  ];
};
