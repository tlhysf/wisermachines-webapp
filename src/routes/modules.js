import ComputerIcon from "@material-ui/icons/Computer";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import colors from "../utils/colors";

// *** Paths ***
export const home = "/";
export const signin = "/signin";
export const pageNotFound = "/pagenotfound";
export const underConstruction = "/comingsoon";

// Modules:
export const machineMonitoring = "Machine-Monitoring";
export const environmentMonitoring = "Environment-Monitoring";

const getIconStyle = (largeIcon) => {
  const dashboardCardIcons = {
    height: 30,
    width: 30,
    color: colors.TEAL[700],
  };

  const listItemIcon = {
    width: 20,
    height: 20,
    color: colors.TEAL[700],
  };

  return largeIcon ? dashboardCardIcons : listItemIcon;
};

export const modules = (largeIcon) => [
  {
    title: "Monitoring",
    url: home,
    icon: <ComputerIcon style={getIconStyle(largeIcon)} />,
    children: [environmentMonitoring, machineMonitoring],
  },
  {
    title: "Analytics",
    url: underConstruction,

    icon: <AssessmentOutlinedIcon style={getIconStyle(largeIcon)} />,
  },
  {
    title: "HR",
    url: underConstruction,
    icon: <SupervisedUserCircleOutlinedIcon style={getIconStyle(largeIcon)} />,
  },
  {
    title: "Schedule",
    url: underConstruction,

    icon: <EventOutlinedIcon style={getIconStyle(largeIcon)} />,
  },
  {
    title: "Management",
    url: underConstruction,
    icon: <BuildOutlinedIcon style={getIconStyle(largeIcon)} />,
  },
];
