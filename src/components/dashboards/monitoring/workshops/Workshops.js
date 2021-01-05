import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { common } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

import { makeStyles } from "@material-ui/core/styles";

import WorkshopCards from "./WorkshopCardsContainer";
import BreadcrumbsNav from "../../../common/Breadcrumbs";
import AddWorkshop from "./inputs/AddWorkshop";
import EditWorkshop from "./inputs/EditWorkshop.js";
import { breadCrumbsList } from "../../../../Routes";

import { useSelector, useDispatch } from "react-redux";
import { getAllWorkshopsAction } from "../../../../redux/actions/workshopsActions";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonAction";

const useStyles = makeStyles((theme) => common(theme));

const Workshops = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const allWorkshops = useSelector((state) => state.workshops.allWorkshops);

  useEffect(() => {
    getAllWorkshopsAction(dispatch);
  }, [dispatch]);

  const navbar = (
    <Grid container justify="center" alignItems="center" spacing={0}>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item>
            <BreadcrumbsNav list={breadCrumbsList.monitoring} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          <Grid item>
            <Tooltip placement="top" title="Add Workshop">
              <Button
                className={classes.button}
                variant="contained"
                onClick={(e) => toggleAddFormDrawerAction(dispatch)}
              >
                <AddIcon
                  className={classes.iconInsideButton}
                  style={{ color: colors.TEAL[700] }}
                />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <React.Fragment>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {navbar}
        </Grid>
        <Grid item xs={12}>
          <WorkshopCards allWorkshops={allWorkshops} />
        </Grid>
      </Grid>
      <AddWorkshop url={props.match.url} params={props.match.params} />
      <EditWorkshop url={props.match.url} params={props.match.params} />
    </React.Fragment>
  );
};

export default Workshops;
