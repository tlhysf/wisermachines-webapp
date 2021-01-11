import React from "react";
import clsx from "clsx";
import Routes from "../../Routes";
// import { useDispatch } from "react-redux";
// import { togglePersistantSideBarAction } from "../../redux/actions/commonActions";

// Components
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
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

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { layoutStyle } from "../../utils/styles";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const General = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const dispatch = useDispatch();

  const [open] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    // setOpen(!open);
    // togglePersistantSideBarAction(dispatch);
    setMobileOpen(!mobileOpen);
  };

  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

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
          disableHoverListener={mobileOpen}
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
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
      className={classes.menuButtonDesktop}
    >
      <MenuIcon className={classes.listItemIcon} />
    </IconButton>
  );

  const desktopDrawer = (
    <Hidden xsDown implementation="css">
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.drawerHeader}>{desktopDrawerButton}</div>
        {drawerList}
      </Drawer>
    </Hidden>
  );

  const mobileDrawer = (
    <Hidden smUp implementation="css">
      <Drawer
        container={container}
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={handleMobileDrawerToggle}
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
    </Hidden>
  );

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Account</MenuItem>
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
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
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>User</p>
      </MenuItem>
    </Menu>
  );

  return props.signedin ? (
    <div className={classes.grow}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileDrawerToggle}
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

          <div className={classes.grow}></div>

          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {mobileDrawer}
      {desktopDrawer}

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div style={{ paddingTop: 56 }}></div>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Routes {...props} signedin={props.signedin} />
            </Grid>
          </Grid>
        </div>
      </main>
    </div>
  ) : (
    <Routes {...props} signedin={props.signedin} />
  );
};

export default General;
