import React, { useEffect, useState } from "react";
import keys from "../../../../utils/keys";

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
} from "../../../../redux/actions/machinesAndNodesActions";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonActions";
import { common as commonActionTypes } from "../../../../redux/actions/actionTypes";

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
            <BreadcrumbsNav list={keys.navigationList.monitoring} />
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

  const renderNodes = nodesLoading ? (
    <Loader />
  ) : (
    <NodeCards allNodesInAZone={allNodesInAZone} />
  );

  const renderMachines = machinesLoading ? (
    <Loader />
  ) : (
    <MachineCards allMachinesInAZone={allMachinesInAZone} compact={compact} />
  );

  const renderMachinesOrNodes =
    machinesOrNodesFilter === machinesOrNodesFiltersList[1]
      ? renderNodes
      : renderMachines;

  return (
    <React.Fragment>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {navbar}
        </Grid>
        <Grid item xs={12}>
          {renderMachinesOrNodes}
        </Grid>
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
    </React.Fragment>
  );
};

export default MachinesAndNodes;
