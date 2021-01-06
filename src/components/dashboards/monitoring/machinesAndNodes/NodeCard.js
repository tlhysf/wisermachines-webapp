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

import { toggleEditFormDrawerAction } from "../../../../redux/actions/commonAction";

const useStyles = makeStyles((theme) => styles(theme));

const NodeCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { name, ID } = props.data;

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

  return (
    <Paper elevation={2} style={{ padding: 10 }}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item xs={10}>
          <Button disableRipple>
            <Typography
              variant="button"
              style={{ color: colors.BLUEGREY[600] }}
            >
              {name}
            </Typography>
          </Button>
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
          </Menu>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NodeCard;
