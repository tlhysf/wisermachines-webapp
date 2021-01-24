import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import PowerOutlinedIcon from "@material-ui/icons/PowerOutlined";

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getStatusNameStr = (valueInt) => {
  switch (valueInt) {
    case 0:
      return "Off";
    case 1:
      return "Idle";
    case 2:
      return "Active";
    default:
      return "Off";
  }
};

const iconStyle = {
  width: 15,
  paddingRight: 3,
};

const getStatusIcon = (valueInt) => {
  switch (valueInt) {
    case 0:
      return <CancelIcon style={iconStyle} />;
    case 1:
      return <PauseCircleFilledIcon style={iconStyle} />;
    case 2:
      return <PlayCircleFilledIcon style={iconStyle} />;
    default:
      return <CancelIcon style={iconStyle} />;
  }
};

export const status = () => {
  const statusChange = randomIntFromInterval(0, 2);
  const statusName = getStatusNameStr(statusChange);

  const statusValueRandom = randomIntFromInterval(0, 60);
  const statusValue = statusValueRandom + " min";

  const statusIcon = getStatusIcon(statusChange);

  const statusThresholds = {
    high: 1.5,
    low: 1,
  };

  return {
    name: statusName,
    change: statusChange,
    value: statusValue,
    icon: statusIcon,
    thresholds: statusThresholds,
  };
};

export const info1 = () => {
  const info1Name = "Uptime";
  const info1Change = randomIntFromInterval(0, 60);
  const info1Value = info1Change + " min";
  const info1Icon = <ArrowUpwardIcon style={iconStyle} />;

  const info1Thresholds = {
    high: 40,
    low: 20,
  };

  return {
    name: info1Name,
    change: info1Change,
    value: info1Value,
    icon: info1Icon,
    thresholds: info1Thresholds,
  };
};

export const info2 = () => {
  const info2Name = "Downtime";
  const info2Change = randomIntFromInterval(0, 60);
  const info2Value = info2Change + " min";
  const info2Icon = <ArrowDownwardIcon style={iconStyle} />;

  const info2Thresholds = {
    high: 40,
    low: 20,
  };

  return {
    name: info2Name,
    change: info2Change,
    value: info2Value,
    icon: info2Icon,
    thresholds: info2Thresholds,
  };
};

export const gaugeItem1 = () => {
  const gaugeItem1Name = "Utilization";
  const gaugeItem1Value = Math.round(Math.random() * 100);
  const gaugeItem1Suffix = "%";
  const gaugeItem1Icon = <TrendingUpIcon style={iconStyle} />;
  const gaugeItem1Thresholds = { high: 66, low: 33 };

  return {
    name: gaugeItem1Name,
    value: gaugeItem1Value,
    suffix: gaugeItem1Suffix,
    thresholds: gaugeItem1Thresholds,
    icon: gaugeItem1Icon,
    yMax: 100,
  };
};

export const gaugeItem2 = () => {
  const gaugeItem2Name = "Units";
  const gaugeItem2Value = Math.round(Math.random() * 100);
  const gaugeItem2Suffix = "KWh";
  const gaugeItem2Icon = <PowerOutlinedIcon style={iconStyle} />;
  const gaugeItem2Thresholds = { high: 66, low: 33 };

  return {
    name: gaugeItem2Name,
    value: gaugeItem2Value,
    suffix: gaugeItem2Suffix,
    thresholds: gaugeItem2Thresholds,
    icon: gaugeItem2Icon,
    yMax: 100,
  };
};
