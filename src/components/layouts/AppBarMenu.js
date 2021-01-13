import React, { useState } from "react";
import { signoutAction } from "../../redux/actions/authActions";

import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";

import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import MoreIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { makeStyles } from "@material-ui/core/styles";
import { layoutStyle } from "../../utils/styles";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const AppBarMenu = (props) => {
  const classes = useStyles();

  const handleSignout = () => {
    handleMenuClose();
    signoutAction();
    window.location.href = "/";
  };

  // *** Dasktop Menu ***

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (
    <Menu
      keepMounted
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={(e) => handleMenuClose(e)}
    >
      <MenuItem>
        <AccountCircleOutlinedIcon className={classes.menuItemIcon} />
        <Typography color="textSecondary">Account</Typography>
      </MenuItem>
      <MenuItem onClick={(e) => handleSignout()}>
        <ExitToAppIcon className={classes.menuItemIcon} />
        <Typography color="textSecondary">Signout</Typography>
      </MenuItem>
    </Menu>
  );

  // *** Mobile Menu ***

  const [anchorElMobile, setAnchorElMobile] = useState(null);
  const isMenuOpenMobile = Boolean(anchorElMobile);

  const handleProfileMenuOpenMobile = (event) => {
    setAnchorElMobile(event.currentTarget);
  };

  const handleMenuCloseMobile = () => {
    setAnchorElMobile(null);
  };

  const renderMobileMenu = (
    <Menu
      keepMounted
      anchorEl={anchorElMobile}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpenMobile}
      onClose={(e) => handleMenuCloseMobile(e)}
    >
      <MenuItem>
        <NotificationsNoneOutlinedIcon className={classes.menuItemIcon} />
        <Typography color="textSecondary">Notifications</Typography>
      </MenuItem>
      <MenuItem>
        <AccountCircleOutlinedIcon className={classes.menuItemIcon} />
        <Typography color="textSecondary">Account</Typography>
      </MenuItem>
      <MenuItem onClick={(e) => handleSignout()}>
        <ExitToAppIcon className={classes.menuItemIcon} />
        <Typography color="textSecondary">Signout</Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <div className={classes.sectionDesktop}>
        <IconButton color="inherit">
          <NotificationsNoneOutlinedIcon />
        </IconButton>
        <IconButton
          edge="end"
          onClick={(e) => handleProfileMenuOpen(e)}
          color="inherit"
        >
          <AccountCircleOutlinedIcon />
        </IconButton>
      </div>
      <div className={classes.sectionMobile}>
        <IconButton
          onClick={(e) => handleProfileMenuOpenMobile(e)}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
      </div>

      {renderMobileMenu}
      {renderMenu}
    </>
  );
};

export default AppBarMenu;
