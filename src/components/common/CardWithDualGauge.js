import React from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { makePath } from "../../Routes";

import { makeStyles } from "@material-ui/core/styles";
import { common as styles } from "../../utils/styles";
import colors from "../../utils/colors";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import DualGauge from "./DualGauge";

import {
  toggleEditFormDrawerAction,
  toggleEditMappingFormDrawerAction,
} from "../../redux/actions/commonAction";

const useStyles = makeStyles((theme) => styles(theme));

const colorSets = {
  info1: {
    high: colors.GREEN[700],
    normal: colors.BLUE[700],
    low: colors.BLUEGREY[700],
  },
  info2: {
    high: colors.ORANGE[700],
    normal: colors.INDIGO[700],
    low: colors.BROWN[700],
  },
  status: {
    high: colors.RED[700],
    normal: colors.PURPLE[700],
    low: colors.GREY[700],
  },
};

const getColor = (change, thresholds, colors) => {
  return change >= thresholds.high
    ? colors.high
    : change >= thresholds.low
    ? colors.normal
    : change < thresholds.low
    ? colors.low
    : colors.low;
};

const CardWithDualGauge = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { name, ID, mapping, status, info1, info2 } = props.data;

  const gaugeItem1Name = "Utilization";
  const gaugeItem1Value = Math.round(Math.random() * 100);
  const gaugeItem1Suffix = "%";
  const gaugeItem2Name = "Units";
  const gaugeItem2Value = Math.round(Math.random() * 100);
  const gaugeItem2Suffix = "KWh";
  const gaugeItem1Thresholds = { high: 66, low: 33 };
  const gaugeItem2Thresholds = { high: 66, low: 33 };

  const gaugeItem1 = {
    name: gaugeItem1Name,
    value: gaugeItem1Value,
    suffix: gaugeItem1Suffix,
    thresholds: gaugeItem1Thresholds,
  };

  const gaugeItem2 = {
    name: gaugeItem2Name,
    value: gaugeItem2Value,
    suffix: gaugeItem2Suffix,
    thresholds: gaugeItem2Thresholds,
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePageChange = () => {
    const { pathname } = props.location;
    window.location.href = makePath(pathname, ID, name);
  };

  const handleEdit = () => {
    handleClose();
    toggleEditFormDrawerAction(dispatch, ID, name);
  };

  const handleMapping = () => {
    handleClose();
    toggleEditMappingFormDrawerAction(dispatch, ID, name);
  };

  const renderStatusText = (data) => (
    <Typography
      variant="caption"
      style={{
        color: getColor(status.change, status.thresholds, colorSets.status),
        display: "inline-block",
        padding: 2,
      }}
    >
      {data}
    </Typography>
  );

  const renderInfo1Text = (data) => (
    <Typography
      variant="caption"
      style={{
        color: getColor(info1.change, info1.thresholds, colorSets.info1),
        display: "inline-block",
        padding: 2,
      }}
    >
      {data}
    </Typography>
  );

  const renderInfo2Text = (data) => (
    <Typography
      variant="caption"
      style={{
        color: getColor(info2.change, info2.thresholds, colorSets.info2),
        display: "inline-block",
        padding: 2,
      }}
    >
      {data}
    </Typography>
  );

  const renderStatus = (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item>
          <div
            style={{
              color: getColor(
                status.change,
                status.thresholds,
                colorSets.status
              ),
            }}
          >
            {status.icon}
          </div>
        </Grid>
        <Grid item>
          {renderStatusText(status.name)}
          {renderStatusText("-")}
          {renderStatusText(status.value)}
        </Grid>
      </Grid>
    </Grid>
  );

  const renderInfo1 = (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item>
          <div
            style={{
              color: getColor(info1.change, info1.thresholds, colorSets.info1),
              paddingRight: 2,
            }}
          >
            {info1.icon}
          </div>
        </Grid>
        <Grid item>
          {renderInfo1Text(info1.name)}
          {renderInfo1Text("-")}
          {renderInfo1Text(info1.value)}
        </Grid>
      </Grid>
    </Grid>
  );

  const renderInfo2 = (
    <Grid item xs={12}>
      <Grid container spacing={0}>
        <Grid item>
          <div
            style={{
              color: getColor(info2.change, info2.thresholds, colorSets.info2),
            }}
          >
            {info2.icon}
          </div>
        </Grid>
        <Grid item>
          {renderInfo2Text(info2.name)}
          {renderInfo2Text("-")}
          {renderInfo2Text(info2.value)}
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Paper elevation={2} style={{ padding: 10 }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={10}>
          {ID ? (
            <Tooltip title="Open" placement="top">
              <Button onClick={handlePageChange}>
                <Typography
                  variant="button"
                  style={{ color: colors.BLUEGREY[600] }}
                >
                  {name}
                </Typography>
              </Button>
            </Tooltip>
          ) : (
            <Button disableRipple>
              <Typography
                variant="button"
                style={{ color: colors.BLUEGREY[600] }}
              >
                {name}
              </Typography>
            </Button>
          )}
        </Grid>
        <Grid item xs="auto">
          <Tooltip title="Settings" placement="top">
            <IconButton onClick={(e) => handleClick(e)}>
              <MoreHorizIcon className={classes.iconButton} />
            </IconButton>
          </Tooltip>
          <Menu
            id="settingsMenu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            {mapping ? (
              <MenuItem onClick={handleMapping}>Mapping</MenuItem>
            ) : null}
          </Menu>
        </Grid>
        <Grid item xs={6}>
          <DualGauge item1={gaugeItem1} item2={gaugeItem2} />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            {renderStatus}
            {renderInfo1}
            {renderInfo2}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(CardWithDualGauge);
