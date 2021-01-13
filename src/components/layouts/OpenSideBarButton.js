import React from "react";
import { useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { makeStyles } from "@material-ui/core/styles";
import { layoutStyle } from "../../utils/styles";

import { toggleSideBarAction } from "../../redux/actions/commonActions";

const useStyles = makeStyles((theme) => layoutStyle(theme));

const OpenSideBarButton = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <IconButton
      color="inherit"
      edge="start"
      onClick={(e) => toggleSideBarAction(dispatch)}
      className={
        props.screen === "desktop"
          ? classes.menuButtonDesktop
          : props.screen === "mobile"
          ? classes.menuButtonMobile
          : null
      }
    >
      <MenuIcon
        className={props.screen === "desktop" ? classes.listItemIcon : null}
      />
    </IconButton>
  );
};

export default OpenSideBarButton;
