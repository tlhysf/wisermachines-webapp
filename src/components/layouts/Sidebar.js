import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import ComputerIcon from "@material-ui/icons/Computer";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import EventOutlinedIcon from "@material-ui/icons/EventOutlined";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";

import { makeStyles } from "@material-ui/core/styles";
import { layoutStyle } from "../../utils/styles";

import { toggleSideBarAction } from "../../redux/actions/commonActions";
import OpenSideBarButton from "./OpenSideBarButton";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const SideBar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const sideBarOpen = useSelector((state) => state.common.toggleSideBar);

  const handleMenuItemClick = (url) => {
    window.location.href = url;
  };

  const underConstruction = "/comingsoon";

  const sideBarListItems = [
    {
      title: "Monitoring",
      url: underConstruction,
      icon: <ComputerIcon className={classes.listItemIcon} />,
    },
    {
      title: "Analytics",
      url: underConstruction,

      icon: <AssessmentOutlinedIcon className={classes.listItemIcon} />,
    },
    {
      title: "HR",
      url: underConstruction,
      icon: (
        <SupervisedUserCircleOutlinedIcon className={classes.listItemIcon} />
      ),
    },
    {
      title: "Schedule",
      url: underConstruction,

      icon: <EventOutlinedIcon className={classes.listItemIcon} />,
    },
    {
      title: "Management",
      url: underConstruction,
      icon: <BuildOutlinedIcon className={classes.listItemIcon} />,
    },
  ];

  const drawerList = (
    <List className={classes.list}>
      {sideBarListItems.map((obj, index) => (
        <Tooltip
          key={index}
          title={obj.title}
          placement="right"
          disableHoverListener={sideBarOpen}
        >
          <ListItem
            button
            key={index}
            onClick={(e) => handleMenuItemClick(obj.url)}
          >
            {obj.icon}
            <Typography variant="overline" className={classes.listItemText}>
              {obj.title}
            </Typography>
          </ListItem>
        </Tooltip>
      ))}
    </List>
  );

  const mobileSideBar = (
    <Drawer
      anchor={"left"}
      open={sideBarOpen}
      onClose={(e) => toggleSideBarAction(dispatch)}
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

  const desktopSideBar = (
    <Drawer
      variant="permanent"
      className={classes.drawerClose}
      classes={{
        paper: classes.drawerClose,
      }}
    >
      <div className={classes.drawerHeader}>
        <OpenSideBarButton screen="desktop" />
      </div>
      {drawerList}
    </Drawer>
  );

  return (
    <>
      {desktopSideBar}
      {mobileSideBar}
    </>
  );
};

export default SideBar;
