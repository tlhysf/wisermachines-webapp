import { Route, Redirect } from "react-router-dom";

import Containers from "../components/dashboards/environmentMonitoring/containers/Containers";
import ContainerDetailes from "../components/dashboards/environmentMonitoring/containerDetails/ContainerDetails";

export const environmentRoutes = (
  signedin,
  thisUser,
  environmentMonitoring,
  signin,
  home
) => {
  const containersAlias = thisUser.navigationAliases[1];

  const navigationList = [
    environmentMonitoring,
    containersAlias,
    "containerName",
  ];

  const root = home + environmentMonitoring + "/";
  const containers = root + containersAlias + "/";
  const containerDetails = containers + ":containerID~:containerName/";

  return [
    <Route
      key={Math.random()}
      exact
      path={root}
      render={() =>
        signedin ? <Redirect to={containers} /> : <Redirect to={signin} />
      }
    />,
    <Route
      key={Math.random()}
      exact
      path={containers}
      render={(props) =>
        signedin ? (
          <Containers {...props} navigationList={navigationList} />
        ) : (
          <Redirect to={signin} />
        )
      }
    />,
    <Route
      key={Math.random()}
      exact
      path={containerDetails}
      render={(props) =>
        signedin ? (
          <ContainerDetailes {...props} navigationList={navigationList} />
        ) : (
          <Redirect to={signin} />
        )
      }
    />,
  ];
};
