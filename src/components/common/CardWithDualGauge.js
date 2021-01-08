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
import EditIcon from "@material-ui/icons/Edit";
import LinkIcon from "@material-ui/icons/Link";

import {
  toggleEditFormDrawerAction,
  toggleEditMappingFormDrawerAction,
} from "../../redux/actions/commonActions";

const useStyles = makeStyles((theme) => styles(theme));

const colorTheme = {
  high: colors.TEAL[700],
  normal: colors.INDIGO[700],
  low: colors.ORANGE[700],
};

const colorSets = {
  info1: colorTheme,
  info2: colorTheme,
  status: colorTheme,
  gaugeItem1: colorTheme,
  gaugeItem2: colorTheme,
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

  const { compact } = props;

  const {
    name,
    ID,
    mapping,
    status,
    info1,
    info2,
    gaugeItem1,
    gaugeItem2,
  } = props.data;

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
        padding: 3,
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
        padding: 3,
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
        padding: 3,
      }}
    >
      {data}
    </Typography>
  );

  const renderGaugeItem1Text = (data) => (
    <Typography
      variant="caption"
      style={{
        color: getColor(
          gaugeItem1.value,
          gaugeItem1.thresholds,
          colorSets.gaugeItem1
        ),
        display: "inline-block",
        padding: 3,
      }}
    >
      {data}
    </Typography>
  );

  const renderGaugeItem2Text = (data) => (
    <Typography
      variant="caption"
      style={{
        color: getColor(
          gaugeItem2.value,
          gaugeItem2.thresholds,
          colorSets.gaugeItem2
        ),
        display: "inline-block",
        padding: 3,
      }}
    >
      {data}
    </Typography>
  );

  const renderStatus = (
    <Grid item xs={12}>
      <Grid container spacing={0} justify="center">
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
        <Grid item>{renderStatusText(status.name + ":")}</Grid>
        <Grid item> {renderStatusText(status.value)}</Grid>
      </Grid>
    </Grid>
  );

  const renderInfo1 = (
    <Grid item xs={12}>
      <Grid container spacing={0} justify="center">
        <Grid item>
          <div
            style={{
              color: getColor(info1.change, info1.thresholds, colorSets.info1),
            }}
          >
            {info1.icon}
          </div>
        </Grid>
        <Grid item>{renderInfo1Text(info1.name + ":")}</Grid>
        <Grid item>{renderInfo1Text(info1.value)}</Grid>
      </Grid>
    </Grid>
  );

  const renderInfo2 = (
    <Grid item xs={12}>
      <Grid container spacing={0} justify="center">
        <Grid item>
          <div
            style={{
              color: getColor(info2.change, info2.thresholds, colorSets.info2),
            }}
          >
            {info2.icon}
          </div>
        </Grid>
        <Grid item>{renderInfo2Text(info2.name + ":")}</Grid>
        <Grid item>{renderInfo2Text(info2.value)}</Grid>
      </Grid>
    </Grid>
  );

  const renderGaugeItem1 = (
    <Grid item xs={12}>
      <Grid container spacing={0} justify="center">
        <Grid item>
          <div
            style={{
              color: getColor(
                gaugeItem1.value,
                gaugeItem1.thresholds,
                colorSets.gaugeItem1
              ),
            }}
          >
            {gaugeItem1.icon}
          </div>
        </Grid>
        <Grid item>{renderGaugeItem1Text(gaugeItem1.name + ":")}</Grid>
        <Grid item>
          {renderGaugeItem1Text(gaugeItem1.value + gaugeItem1.suffix)}
        </Grid>
      </Grid>
    </Grid>
  );

  const renderGaugeItem2 = (
    <Grid item xs={12}>
      <Grid container spacing={0} justify="center">
        <Grid item>
          <div
            style={{
              color: getColor(
                gaugeItem2.value,
                gaugeItem2.thresholds,
                colorSets.gaugeItem2
              ),
            }}
          >
            {gaugeItem2.icon}
          </div>
        </Grid>
        <Grid item>{renderGaugeItem2Text(gaugeItem2.name + ":")}</Grid>
        <Grid item>
          {renderGaugeItem2Text(gaugeItem2.value + gaugeItem2.suffix)}
        </Grid>
      </Grid>
    </Grid>
  );

  const renderCompactView = (
    <Grid item xs={12}>
      <Grid
        container
        justify="space-between"
        alignItems="flex-start"
        style={{ padding: 5 }}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>{renderStatus}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>{renderInfo1}</Grid>
            <Grid item>{renderInfo2}</Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item>{renderGaugeItem1}</Grid>
            <Grid item>{renderGaugeItem2}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Paper elevation={2} style={{ padding: 10 }} className={classes.cardHover}>
      <Grid container justify="space-around" alignItems="center">
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
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
            <Grid item>
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
                <MenuItem onClick={handleEdit}>
                  <EditIcon className={classes.menuItemIcon} />

                  <Typography variant="inherit">Edit</Typography>
                </MenuItem>
                {mapping ? (
                  <MenuItem onClick={handleMapping}>
                    <LinkIcon className={classes.menuItemIcon} />

                    <Typography variant="inherit">Change Mapping</Typography>
                  </MenuItem>
                ) : null}
              </Menu>
            </Grid>
          </Grid>
        </Grid>
        {compact ? null : (
          <Grid item lg={6} md={12}>
            <DualGauge
              item1={gaugeItem1}
              item2={gaugeItem2}
              colorSets={colorSets}
            />
          </Grid>
        )}
        {compact ? null : (
          <Grid item lg={6} md={12}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
              style={{ padding: 5 }}
            >
              {renderStatus}
              {renderInfo1}
              {renderInfo2}
            </Grid>
          </Grid>
        )}
        {compact ? renderCompactView : null}
      </Grid>
    </Paper>
  );
};

export default withRouter(CardWithDualGauge);
