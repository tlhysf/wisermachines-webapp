import CheckCircleOutlineRoundedIcon from "@material-ui/icons/CheckCircleOutlineRounded";
import SpeedIcon from "@material-ui/icons/Speed";
import OpacityIcon from "@material-ui/icons/Opacity";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PowerOutlinedIcon from "@material-ui/icons/PowerOutlined";
import UpdateIcon from "@material-ui/icons/Update";
import colors from "../utils/colors";

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
      secondary: "1H 24M 56S",
      color: colors.CYAN[700],
    },
  };

  const statusTotal = {
    icon: <CheckCircleOutlineRoundedIcon style={iconStyle} />,
    values: {
      primary: "Machines Currently Active",
      secondary: "120 / 200",
      color: colors.CYAN[700],
    },
  };

  const utilizationAverage = {
    icon: <TrendingUpIcon style={iconStyle} />,
    values: {
      primary: "Average Utilization",
      secondary: "78 %",
      color: colors.GREEN[700],
    },
  };

  const unitsTotal = {
    icon: <PowerOutlinedIcon style={iconStyle} />,
    values: {
      primary: "Total Unit Consumption",
      secondary: "6780 kWh",
      color: colors.INDIGO[700],
    },
  };

  const TemperatureAverage = {
    icon: <SpeedIcon style={iconStyle} />,
    values: {
      primary: "Average Temperature",
      secondary: "41 \u00B0C",
      color: colors.ORANGE[700],
    },
  };

  const HumidityAvarage = {
    icon: <OpacityIcon style={iconStyle} />,
    values: {
      primary: "Average Humidity",
      secondary: "56 %RH",
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
