import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import SpeedIcon from "@material-ui/icons/Speed";
import OpacityIcon from "@material-ui/icons/Opacity";

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const iconStyle = {
  width: 15,
};

export const status = () => {
  const statusName = "Total Active";
  const total = randomIntFromInterval(0, 100);
  const statusChange = randomIntFromInterval(0, total);
  const statusValue = statusChange + "/" + total;
  const statusIcon = <CheckCircleOutlineIcon style={iconStyle} />;

  const statusThresholds = {
    high: total * 0.66,
    low: total * 0.33,
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
  const total = 80;
  const info1Name = "Temperature";
  const info1Change = randomIntFromInterval(0, total);
  const info1Value = info1Change + "\u00B0C";
  const info1Icon = <SpeedIcon style={iconStyle} />;

  const info1Thresholds = {
    high: total * 0.66,
    low: total * 0.33,
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
  const total = 100;
  const info2Name = "Humidity";
  const info2Change = randomIntFromInterval(0, total);
  const info2Value = info2Change + " %RH";
  const info2Icon = <OpacityIcon style={iconStyle} />;

  const info2Thresholds = {
    high: total * 0.66,
    low: total * 0.33,
  };

  return {
    name: info2Name,
    change: info2Change,
    value: info2Value,
    icon: info2Icon,
    thresholds: info2Thresholds,
  };
};
