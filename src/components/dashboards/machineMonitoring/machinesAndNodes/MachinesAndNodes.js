import React, { useEffect, useState } from "react";

// MUI Components
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

// MUI Icons
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ViewCompactIcon from "@material-ui/icons/ViewCompact";

// Styling
import { makeStyles } from "@material-ui/core/styles";
import { common } from "../../../../utils/styles";
import colors from "../../../../utils/colors";

// Custom Components
import MachineCards from "./MachineCardsContainer";
import NodeCards from "./NodeCardsContainer";
import BreadcrumbsNav from "../../../common/Breadcrumbs";
import FilterAndSortMenu from "../../../common/FilterAndSortMenu";
import AlertCard from "../../../common/AlertCard";

// Forms
import AddMachine from "./inputs/AddMachine";
import EditMachine from "./inputs/EditMachine";
import AddNode from "./inputs/AddNode";
import EditNode from "./inputs/EditNode";
import EditMachineMapping from "./inputs/EditMachineMapping";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getAllNodesInAZoneAction,
  getAllMachinesInAZoneAction,
  getAllMachineMappingsAction,
} from "../../../../redux/actions/machineMonitoring/machinesAndNodesActions";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonActions";
import { common as commonActionTypes } from "../../../../redux/actions/actionTypes";
import { isNotEmpty } from "../../../../utils/validation";

// Loaders
import Loader from "../../../common/Loader";

const useStyles = makeStyles((theme) => common(theme));

const machinesOrNodesFiltersList = ["machines", "nodes"];

const MachinesAndNodes = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [compact, setCompact] = useState(false);

  const machinesLoading = useSelector(
    (state) => state.machines.machinesLoading
  );

  const nodesLoading = useSelector((state) => state.nodes.nodesLoading);

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
    getAllMachineMappingsAction(dispatch);
    getAllMachinesInAZoneAction(dispatch, props.match.params.zoneID);
    getAllNodesInAZoneAction(dispatch, props.match.params.zoneID);
  }, [dispatch, props]);

  const navbar = (
    <Grid container justify="space-between" alignItems="center" spacing={2}>
      <Grid item xs={12} md={"auto"}>
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          <Grid item>
            <BreadcrumbsNav list={props.navigationList} />
          </Grid>

          <Grid item>
            <FilterAndSortMenu
              options={machinesOrNodesFiltersList}
              selected={machinesOrNodesFilter}
              type={commonActionTypes.filterByNodesOrMachines}
              width={60}
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
      <Grid item xs={12} md={"auto"}>
        <Grid container spacing={1} justify="flex-start" alignItems="center">
          {machinesOrNodesFilter === machinesOrNodesFiltersList[1] ? null : (
            <Grid item>
              <Tooltip title="Compact View" placement="top">
                <Button
                  className={classes.button}
                  onClick={(e) => setCompact(!compact)}
                  style={compact ? { backgroundColor: colors.TEAL[700] } : {}}
                  variant="contained"
                >
                  <ViewCompactIcon
                    className={classes.iconInsideButton}
                    style={
                      compact ? { color: "white" } : { color: colors.TEAL[700] }
                    }
                  />
                </Button>
              </Tooltip>
            </Grid>
          )}
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
                variant="contained"
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

  const renderNotFound = (list, loading) =>
    !isNotEmpty(list) && !loading ? (
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

  const renderNodes = nodesLoading ? (
    <Grid item>{renderLoading}</Grid>
  ) : (
    <Grid item xs={12}>
      <NodeCards allNodesInAZone={allNodesInAZone} />
    </Grid>
  );

  const renderMachines = machinesLoading ? (
    <Grid item>{renderLoading}</Grid>
  ) : (
    <Grid item xs={12}>
      <div style={{ padding: 5, marginBottom: 15 }}>
        <AlertCard message={"Under Development"} />
      </div>

      <MachineCards allMachinesInAZone={allMachinesInAZone} compact={compact} />
    </Grid>
  );

  const renderMachinesOrNodes =
    machinesOrNodesFilter === machinesOrNodesFiltersList[1]
      ? renderNodes
      : renderMachines;

  const renderMachinesOrNodesNotFound =
    machinesOrNodesFilter === machinesOrNodesFiltersList[1]
      ? renderNotFound(allNodesInAZone, nodesLoading)
      : renderNotFound(allMachinesInAZone, machinesLoading);

  return (
    <>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {navbar}
        </Grid>

        {renderMachinesOrNodes}
        {renderMachinesOrNodesNotFound}
      </Grid>

      {machinesOrNodesFilter === machinesOrNodesFiltersList[1] ? (
        <AddNode />
      ) : (
        <AddMachine url={props.match.url} params={props.match.params} />
      )}
      {machinesOrNodesFilter === machinesOrNodesFiltersList[1] ? (
        <EditNode url={props.match.url} params={props.match.params} />
      ) : (
        <EditMachine url={props.match.url} params={props.match.params} />
      )}
      <EditMachineMapping url={props.match.url} params={props.match.params} />
    </>
  );
};

export default MachinesAndNodes;
