import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Tooltip from "@material-ui/core/Tooltip";

import { modules as sideBarListItems } from "../../routes/modules";

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

  const drawerList = (
    <List className={classes.list}>
      {sideBarListItems().map((obj, index) => (
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

  const openedSideBar = (
    <Drawer
      anchor={"left"}
      open={sideBarOpen}
      classes={{
        paper: classes.drawer,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div className={classes.drawerHeader}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            fullWidth
            onClick={(e) => toggleSideBarAction(dispatch)}
            style={{
              padding: 15,
            }}
          >
            <CloseIcon className={classes.listItemIcon} />
          </Button>
        </div>
      </div>
      {drawerList}
    </Drawer>
  );

  const closedSideBar = (
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
      {closedSideBar}
      {openedSideBar}
    </>
  );
};

export default SideBar;
