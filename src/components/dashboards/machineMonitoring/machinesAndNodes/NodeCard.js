import React from "react";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { common as styles } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { toggleEditFormDrawerAction } from "../../../../redux/actions/commonActions";

const useStyles = makeStyles((theme) => styles(theme));

const NodeCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { name, ID, sensor1, sensor2 } = props.data;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
    toggleEditFormDrawerAction(dispatch, ID, name);
  };

  const item1 = {
    sensor: sensor1
      ? sensor1.Sensor_Number
      : sensor2
      ? 3 - sensor2.Sensor_Number
      : 1,
    machine: sensor1 ? sensor1.Machine_Name : "Not connected",
  };

  const item2 = {
    sensor: sensor2
      ? sensor2.Sensor_Number
      : sensor1
      ? 3 - sensor1.Sensor_Number
      : 2,
    machine: sensor2 ? sensor2.Machine_Name : "Not connected",
  };

  return (
    <Paper elevation={2} style={{ padding: 10 }} className={classes.cardHover}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={10}>
          <Tooltip title="MAC Address" placement="top">
            <Button disableRipple>
              <Typography
                variant="button"
                style={{ color: colors.BLUEGREY[600] }}
              >
                {name}
              </Typography>
            </Button>
          </Tooltip>
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
            <MenuItem onClick={handleEdit}>
              <EditIcon className={classes.menuItemIcon} />

              <Typography variant="inherit">Edit</Typography>
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{
                      color: colors.BLUEGREY[600],
                      padding: 10,
                      display: "inline-block",
                    }}
                  >
                    {"Sensor "}
                    {item1.sensor}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{
                      color: colors.TEAL[600],
                      padding: 10,
                      display: "inline-block",
                    }}
                  >
                    {item1.machine}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{
                      color: colors.BLUEGREY[600],
                      padding: 10,
                      display: "inline-block",
                    }}
                  >
                    {"Sensor "}
                    {item2.sensor}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    style={{
                      color: colors.TEAL[600],
                      padding: 10,
                      display: "inline-block",
                    }}
                  >
                    {item2.machine}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NodeCard;
