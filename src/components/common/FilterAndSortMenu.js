import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  filterByTimeAction,
  filterByMachinesOrNodes,
} from "../../redux/actions/commonActions";
import { common as commonActionTypes } from "../../redux/actions/actionTypes";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

import { makeStyles } from "@material-ui/core/styles";
import { common } from "../../utils/styles";

const useStyles = makeStyles((theme) => common(theme));

const defaultOptions = ["Disabled"];

export default function FilterAndSortMenu(props) {
  const dispatch = useDispatch();
  const { options, selected, icon } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [optionsList] = React.useState(options ? options : defaultOptions);
  const [selection, setSelection] = React.useState(
    selected ? selected : defaultOptions[0]
  );

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event, item) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);

    if (item) setSelection(item);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    switch (props.type) {
      case commonActionTypes.filterByNodesOrMachines:
        filterByMachinesOrNodes(dispatch, selection);
        break;

      case commonActionTypes.filterByTime:
        filterByTimeAction(dispatch, selection);
        break;

      default:
        break;
    }
  }, [selection, dispatch, props]);

  return (
    <span>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className={classes.button}
        variant="contained"
      >
        {icon ? icon : null}
        <Typography variant="caption">{selection}</Typography>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.popper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener
                onClickAway={(event) => handleClose(event, null)}
              >
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  {optionsList.map((item, index) => {
                    return (
                      <MenuItem
                        key={index}
                        onClick={(event) => handleClose(event, item)}
                      >
                        <Typography variant="overline">{item}</Typography>
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </span>
  );
}
