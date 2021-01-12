import React, { useState } from "react";
import Routes from "../../Routes";
import { signoutAction } from "../../redux/actions/authActions";

// Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import MenuIcon from "@material-ui/icons/Menu";

// Sidebar icons
import ComputerIcon from "@material-ui/icons/Computer";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";

import { makeStyles } from "@material-ui/core/styles";
import { layoutStyle } from "../../utils/styles";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const General = (props) => {
  const classes = useStyles();

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleSideBarDrawerToggle = () => {
    setSideBarOpen(!sideBarOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSignout = () => {
    handleMenuClose();
    signoutAction();
    window.location.href = "/";
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const sideBarListItems = [
    {
      title: "Monitoring",
      icon: <ComputerIcon className={classes.listItemIcon} />,
    },
    {
      title: "Analytics",
      icon: <AssessmentOutlinedIcon className={classes.listItemIcon} />,
    },
    {
      title: "HR",
      icon: (
        <SupervisedUserCircleOutlinedIcon className={classes.listItemIcon} />
      ),
    },
    {
      title: "Schedule",
      icon: <EventOutlinedIcon className={classes.listItemIcon} />,
    },
    {
      title: "Management",
      icon: <BuildOutlinedIcon className={classes.listItemIcon} />,
    },
  ];

  const drawerList = (
    <List className={classes.list}>
      {sideBarListItems.map((obj, index) => (
        <Tooltip
          title={obj.title}
          placement="right"
          disableHoverListener={sideBarOpen}
        >
          <ListItem button key={index}>
            {obj.icon}
            <Typography variant="overline" className={classes.listItemText}>
              {obj.title}
            </Typography>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );

  const desktopDrawerButton = (
    <IconButton
      color="inherit"
      edge="start"
      onClick={handleSideBarDrawerToggle}
      className={classes.menuButtonDesktop}
    >
      <MenuIcon className={classes.listItemIcon} />
    </IconButton>
  );

  const desktopDrawer = (
    <Drawer
      variant="permanent"
      className={classes.drawerClose}
      classes={{
        paper: classes.drawerClose,
      }}
    >
      <div className={classes.drawerHeader}>{desktopDrawerButton}</div>
      {drawerList}
    </Drawer>
  );

  const sideBarDrawer = (
    <Drawer
      anchor={"left"}
      open={sideBarOpen}
      onClose={handleSideBarDrawerToggle}
      classes={{
        paper: classes.drawer,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.drawerHeader}></div>
      {drawerList}
    </Drawer>
  );

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Account</MenuItem>
      <MenuItem onClick={handleSignout}>Signout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <p>User</p>
      </MenuItem>
    </Menu>
  );

  return props.signedin ? (
    <React.Fragment>
      <div className={classes.grow}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* Show menu button in Appbar from size equal to less than medium */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleSideBarDrawerToggle}
              className={classes.menuButtonMobile}
            >
              <MenuIcon />
            </IconButton>

            <Tooltip title="WiserMachines" placement="right">
              <Button edge="start">
                <img
                  src="/img/logo.png"
                  alt="WiserMachines"
                  className={classes.logo}
                />
              </Button>
            </Tooltip>

            {/* Push all content after this point to the right  */}
            <div className={classes.grow}></div>

            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <IconButton
                edge="end"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton onClick={handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
        {renderMenu}
        {sideBarDrawer}
        {desktopDrawer}

        <main className={classes.content}>
          <div style={{ paddingTop: 56 }}></div>
          <div>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
            >
              <Grid item xs={12}>
                <Routes {...props} />
              </Grid>
            </Grid>
          </div>
        </main>
      </div>
    </React.Fragment>
  ) : (
    <Routes {...props} />
  );
};

export default General;
