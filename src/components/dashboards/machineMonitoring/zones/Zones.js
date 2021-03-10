import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

import { isNotEmpty } from "../../../../utils/validation";

import { common } from "../../../../utils/styles";
import colors from "../../../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";

import ZoneCards from "./ZoneCardsContainer";
import BreadcrumbsNav from "../../../common/Breadcrumbs";
import AddZone from "./inputs/AddZone";
import EditZone from "./inputs/EditZone";
import AlertCard from "../../../common/AlertCard";

import { useSelector, useDispatch } from "react-redux";
import { getAllZonesInAWorkshopAction } from "../../../../redux/actions/machineMonitoring/zonesActions";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonActions";

import Loader from "../../../common/Loader";

const useStyles = makeStyles((theme) => common(theme));

const Zones = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const allZonesInAWorkshop = useSelector(
    (state) => state.zones.allZonesInAWorkshop
  );

  const zonesLoading = useSelector((state) => state.zones.zonesLoading);

  useEffect(() => {
    getAllZonesInAWorkshopAction(dispatch, props.match.params.workshopID);
  }, [dispatch, props]);

  const navbar = (
    <Grid container justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} md={"auto"}>
        <BreadcrumbsNav list={props.navigationList} />
      </Grid>
      <Grid item xs={12} md={"auto"}>
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <Tooltip placement="top" title="Add">
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

  const renderNoData =
    !isNotEmpty(allZonesInAWorkshop) && !zonesLoading ? (
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "70vh" }}
          spacing={4}
        >
          <AlertCard message={"Couldn't find anything"} />
        </Grid>
      </Grid>
    ) : null;

  const renderLoading = (
    <div>
      <Loader color={colors.BLUE[600]} />

      <div>
        <AlertCard message={"Your Data is Being Loaded."} />
      </div>
    </div>
  );

  return (
    <>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {navbar}
        </Grid>
        <Grid item xs={zonesLoading ? "auto" : 12}>
          {zonesLoading ? (
            renderLoading
          ) : (
            <ZoneCards allZonesInAWorkshop={allZonesInAWorkshop} />
          )}
        </Grid>
        {renderNoData}
      </Grid>
      <AddZone url={props.match.url} params={props.match.params} />
      <EditZone url={props.match.url} params={props.match.params} />
    </>
  );
};

export default Zones;
