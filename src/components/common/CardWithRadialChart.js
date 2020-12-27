import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { makePath } from "../../Routes";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { common as styles } from "../../utils/styles";
import { toggleEditFormDrawerAction } from "../../redux/actions/commonAction";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => styles(theme));

const CardWithRadialChart = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [title, setTitle] = useState(null);
  const [ID, setID] = useState(null);

  const handlePageChange = () => {
    const { pathname } = props.location;
    window.location.href = makePath(pathname, ID, title);
  };

  useEffect(() => {
    setTitle(props.data.name);
    setID(props.data.ID);
  }, [props.data]);

  return (
    <Paper elevation={2} style={{ padding: 10 }}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={10}>
          {ID ? (
            <Tooltip title="Open" placement="top">
              <Button onClick={handlePageChange}>
                <Typography variant="button">{title}</Typography>
              </Button>
            </Tooltip>
          ) : (
            <Button disableRipple>
              <Typography variant="button">{title}</Typography>
            </Button>
          )}
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Edit" placement="top">
            <IconButton
              onClick={(e) => toggleEditFormDrawerAction(dispatch, ID, title)}
            >
              <EditIcon className={classes.iconButton} />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default withRouter(CardWithRadialChart);
