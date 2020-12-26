import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { breadCrumbsList } from "../../../../Routes";
import { common } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

import { makeStyles } from "@material-ui/core/styles";

import MachineCards from "./MachineCardsContainer";
import NodeCards from "./NodeCardsContainer";

import BreadcrumbsNav from "../../../common/Breadcrumbs";
import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import AddMachine from "./inputs/AddMachine";
import EditMachine from "./inputs/EditMachine";
import AddNode from "./inputs/AddNode";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllNodesInAZoneAction,
  getAllMachinesInAZoneAction,
} from "../../../../redux/actions/machinesAndNodesActions";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonAction";
import { common as commonActionTypes } from "../../../../redux/actions/actionTypes";

const useStyles = makeStyles((theme) => common(theme));

const machinesOrNodesFiltersList = ["machines", "nodes"];

const MachinesAndNodes = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const allMachinesInAZone = useSelector(
    (state) => state.machines.allMachinesInAZone
  );

  const allNodesInAZone = useSelector((state) => state.nodes.allNodesInAZone);

  const [machinesOrNodesFilter, setMachinesOrNodesFilter] = useState(
    machinesOrNodesFiltersList[0]
  );

  const machinesOrNodesFilterSelected = useSelector(
    (state) => state.common.machinesOrNodesFilter
  );

  useEffect(() => {
    setMachinesOrNodesFilter(machinesOrNodesFilterSelected);
  }, [machinesOrNodesFilterSelected]);

  useEffect(() => {
    getAllMachinesInAZoneAction(dispatch, props.match.params.zoneID);
    getAllNodesInAZoneAction(dispatch, props.match.params.zoneID);
  }, [dispatch, props]);

  const navbar = (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <BreadcrumbsNav list={breadCrumbsList.monitoring} />
          </Grid>
          <Grid item>
            <FilterAndSortMenu
              options={machinesOrNodesFiltersList}
              selected={machinesOrNodesFilter}
              type={commonActionTypes.filterByNodesOrMachines}
              icon={
                <ExpandMoreIcon
                  style={{ color: colors.TEAL[700] }}
                  className={classes.iconInsideButton}
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Tooltip
              title={
                machinesOrNodesFilter === machinesOrNodesFiltersList[1]
                  ? "Add Node"
                  : "Add Machine"
              }
              placement="top"
            >
              <Button
                className={classes.button}
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
        <Grid item xs={12} component={Paper} elevation={0}>
          {machinesOrNodesFilter === machinesOrNodesFiltersList[1] ? (
            <NodeCards allNodesInAZone={allNodesInAZone} />
          ) : (
            <MachineCards allMachinesInAZone={allMachinesInAZone} />
          )}
        </Grid>
      </Grid>
      {machinesOrNodesFilter === machinesOrNodesFiltersList[1] ? (
        <AddNode />
      ) : (
        <AddMachine url={props.match.url} params={props.match.params} />
      )}
      {machinesOrNodesFilter === machinesOrNodesFiltersList[1] ? (
        <AddNode url={props.match.url} params={props.match.params} />
      ) : (
        <EditMachine url={props.match.url} params={props.match.params} />
      )}
    </React.Fragment>
  );
};

export default MachinesAndNodes;
