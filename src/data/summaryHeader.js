import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import SpeedIcon from "@material-ui/icons/Speed";
import OpacityIcon from "@material-ui/icons/Opacity";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PowerOutlinedIcon from "@material-ui/icons/PowerOutlined";
import UpdateIcon from "@material-ui/icons/Update";
import colors from "../utils/colors";

import { timeDifference } from "../utils/parse";

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const iconStyle = {
  width: 30,
};

export const summaryHeader = () => {
  const lastUpdated = {
    icon: <UpdateIcon style={iconStyle} />,
    values: {
      primary: "Last Updated",
      secondary: timeDifference(randomIntFromInterval(0, 3600 * 24 * 1000), 0),
      color: colors.CYAN[700],
    },
  };

  const CurrentlyActiveTotal = randomIntFromInterval(0, 100);
  const statusTotal = {
    icon: <CheckCircleOutlineRoundedIcon style={iconStyle} />,
    values: {
      primary: "Active",
      secondary:
        String(randomIntFromInterval(0, CurrentlyActiveTotal)) +
        "/" +
        String(CurrentlyActiveTotal),
      color: colors.BLUE[700],
    },
  };

  const utilizationAverage = {
    icon: <TrendingUpIcon style={iconStyle} />,
    values: {
      primary: "Utilization",
      secondary: String(randomIntFromInterval(0, 100)) + " %",
      color: colors.GREEN[700],
    },
  };

  const unitsTotal = {
    icon: <PowerOutlinedIcon style={iconStyle} />,
    values: {
      primary: "Units",
      secondary: String(randomIntFromInterval(0, 100)) + " kWh",
      color: colors.INDIGO[700],
    },
  };

  const TemperatureAverage = {
    icon: <SpeedIcon style={iconStyle} />,
    values: {
      primary: "Temperature",
      secondary: String(randomIntFromInterval(0, 100)) + " \u00B0C",
      color: colors.ORANGE[700],
    },
  };

  const HumidityAvarage = {
    icon: <OpacityIcon style={iconStyle} />,
    values: {
      primary: "Humidity",
      secondary: String(randomIntFromInterval(0, 100)) + " %RH",
      color: colors.PURPLE[700],
    },
  };
  return [
    lastUpdated,
    statusTotal,
    utilizationAverage,
    unitsTotal,
    TemperatureAverage,
    HumidityAvarage,
  ];
};
