import React from "react";
import { withRouter } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ButtonBase from "@material-ui/core/ButtonBase";
import ComputerIcon from "@material-ui/icons/Computer";
import ToolTip from "@material-ui/core/ToolTip";
import colors from "../../utils/colors";

const style = {
  link: {
    display: "flex",
  },
  icon: {
    width: 20,
    height: 20,
  },
  paper: {
    paddingLeft: 10,
    paddingRight: 10,
  },
};

const handleClick = (event, path) => {
  event.preventDefault();
  window.location.href = path;
};

const getPreviousPath = (currentPath) => {
  const splitedPath = currentPath.split("/").filter((str) => str);
  const previousPath = currentPath.replace(splitedPath.slice(-1).pop(), "");
  return previousPath.replace(/\/+$/g, "");
};

const BreadcrumbsNav = (props) => {
  const {
    list,
    location: { pathname },
    match: { params },
  } = props;

  const breadcrumbsNames = list.map((name) =>
    params[name] ? params[name].split("_").join(" ").split("-").join(" ") : name
  );

  const pathnames = pathname.split("/").filter((str) => str);
  let currentPath = pathname;
  const allPaths = pathnames
    .map((item) => {
      const nextPath = currentPath;
      currentPath = getPreviousPath(currentPath);
      return nextPath;
    })
    .filter((str) => str);
  allPaths.reverse();

  const renderBreadcrumbs = allPaths.map((path, index) =>
    index === allPaths.length - 1 ? (
      <Typography
        variant="overline"
        style={{ color: colors.TEAL[800] }}
        key={index}
      >
        {breadcrumbsNames[index]}
      </Typography>
    ) : index === 0 ? (
      <Link
        color="inherit"
        onClick={(event) => handleClick(event, path)}
        key={index}
        style={style.link}
      >
        <ToolTip title={breadcrumbsNames[index].toUpperCase()} placement="top">
          <ButtonBase>
            <ComputerIcon style={style.icon} />
          </ButtonBase>
        </ToolTip>
      </Link>
    ) : (
      <Link
        color="inherit"
        onClick={(event) => handleClick(event, path)}
        key={index}
      >
        <ButtonBase>
          <Typography variant="overline">{breadcrumbsNames[index]}</Typography>
        </ButtonBase>
      </Link>
    )
  );

  return (
    <Paper elevation={2} style={style.paper}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {renderBreadcrumbs}
      </Breadcrumbs>
    </Paper>
  );
};

export default withRouter(BreadcrumbsNav);
