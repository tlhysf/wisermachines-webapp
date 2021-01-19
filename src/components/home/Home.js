import React from "react";
import { modules } from "../../routes/modules";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Button from "@material-ui/core/Button";
import TypoGraphy from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

// import

import colors from "../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  root: { height: "30vh" },
  card: {
    height: 100,
    width: 250,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    "&:hover": {
      boxShadow: "0px 0.5px 1px 2px" + colors.INDIGO[400],
    },
  },
  popOver: {
    width: 250,
  },
};

const useStyle = makeStyles(styles);

const largeIcon = true;

const RenderCard = (props) => {
  const classes = useStyle();
  const color = colors.TEAL[700];

  const { data } = props;
  const { title, icon, url, children } = data;

  const [togglePopover, setTogglePopover] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (e, url, children) => {
    if (children) {
      togglePopoverHandler(e);
    } else {
      window.location.href = url;
    }
  };

  const togglePopoverHandler = (e) => {
    setAnchorEl(e.currentTarget);
    setTogglePopover(!togglePopover);
  };

  const handlePopoverItemClick = (e, url) => {
    // console.log(url);
    window.location.href = "/" + url + "/";
  };

  const renderParent = (
    <Paper className={classes.card} elevation={2}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} style={{ color: color }}>
          {icon}
        </Grid>
        <Grid item xs={12}>
          <TypoGraphy variant="overline" style={{ color: color }}>
            {title.split("-").join(" ")}
          </TypoGraphy>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderChildren = (children) => (
    <Popover
      open={togglePopover}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Grid container className={classes.popOver}>
        {children
          ? children.map((child) => (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  endIcon={<ArrowForwardIosIcon style={{ width: 10, color }} />}
                  onClick={(e) => handlePopoverItemClick(e, child)}
                >
                  <TypoGraphy variant="overline" style={{ color }}>
                    {child.split("-").join(" ")}
                  </TypoGraphy>
                </Button>
              </Grid>
            ))
          : null}
      </Grid>
    </Popover>
  );

  return (
    <Tooltip
      title={"Click To Open"}
      placement="top"
      disableHoverListener={togglePopover}
    >
      <ButtonBase onClick={(e) => handleClick(e, url, children)}>
        {renderParent}
        {togglePopover ? renderChildren(children) : null}
      </ButtonBase>
    </Tooltip>
  );
};

const Home = () => {
  const classes = useStyle();

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
      spacing={2}
    >
      {modules(largeIcon).map((item, index) => {
        const { title, icon, url, children } = item;

        return (
          <Grid item key={index}>
            <RenderCard data={{ title, icon, url, children }} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Home;
