import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

import { isNotEmpty } from "../../../../utils/validation";

import { common } from "../../../../utils/styles";
import colors from "../../../../utils/colors";
import { makeStyles } from "@material-ui/core/styles";

import BreadcrumbsNav from "../../../common/Breadcrumbs";
import AlertCard from "../../../common/AlertCard";

import Cards from "./Cards";
import Add from "./inputs/Add";
import Edit from "./inputs/Edit";

import { useSelector, useDispatch } from "react-redux";
import { toggleAddFormDrawerAction } from "../../../../redux/actions/commonActions";
import { populateContainersPageAction } from "../../../../redux/actions/environmentMonitoring/containersPageActions";

import Loader from "../../../common/Loader";

const useStyles = makeStyles((theme) => common(theme));

const Containers = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const allContainers = useSelector(
    (state) => state.environmentMonitoring.containersPage.allContainers
  );

  const containersLoading = useSelector(
    (state) => state.environmentMonitoring.containersPage.containersLoading
  );

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    populateContainersPageAction(dispatch, user);
  }, [dispatch, user]);

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
            <BreadcrumbsNav list={props.navigationList} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container direction="row" justify="flex-end" alignItems="center">
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
    !isNotEmpty(allContainers) && !containersLoading ? (
      <Grid item>
        <Grid
          container
          justify="center"
          alignItems="center"
          style={{ height: "70vh" }}
          spacing={4}
        >
          <AlertCard message={`Nothing has been added yet.`} />
        </Grid>
      </Grid>
    ) : null;

  return (
    <>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12}>
          {navbar}
        </Grid>
        <Grid item xs={12}>
          {containersLoading ? <Loader /> : <Cards all={allContainers} />}
        </Grid>
        {renderNoData}
      </Grid>
      <Add url={props.match.url} params={props.match.params} />
      <Edit url={props.match.url} params={props.match.params} />
    </>
  );
};

export default Containers;
