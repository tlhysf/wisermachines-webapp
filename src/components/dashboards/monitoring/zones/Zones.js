import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { common } from "../../../../utils/styles";
import colors from "../../../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";

import ZoneCards from "./ZoneCardsContainer";
import BreadcrumbsNav from "../../../common/Breadcrumbs";
// import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import AddZone from "./inputs/AddZone";
import EditZone from "./inputs/EditZone";
import { breadCrumbsList } from "../../../../Routes";

import { useSelector, useDispatch } from "react-redux";
import { getAllZonesInAWorkshopAction } from "../../../../redux/actions/zonesActions";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonAction";

const useStyles = makeStyles((theme) => common(theme));

const Zones = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const allZonesInAWorkshop = useSelector(
    (state) => state.zones.allZonesInAWorkshop
  );

  useEffect(() => {
    getAllZonesInAWorkshopAction(dispatch, props.match.params.workshopID);
  }, [dispatch, props]);

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
            <Tooltip placement="top" title="Add Zone">
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
          <ZoneCards allZonesInAWorkshop={allZonesInAWorkshop} />
        </Grid>
      </Grid>
      <AddZone url={props.match.url} params={props.match.params} />
      <EditZone url={props.match.url} params={props.match.params} />
    </React.Fragment>
  );
};

export default Zones;
