import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditMappingFormDrawerAction } from "../../../../../redux/actions/commonAction";
import {
  editMachineMappingAction,
  deleteMachineMappingAction,
} from "../../../../../redux/actions/machinesAndNodesActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Grow from "@material-ui/core/Grow";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle, formSlider } from "../../../../../utils/styles";

const useStyles = makeStyles((theme) => formStyle(theme));

const EditMachineMapping = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector(
    (state) => state.common.toggleEditMappingFormDrawer
  );

  const response = useSelector(
    (state) => state.machines.editMachineMappingResponse
  );

  const editLoading = useSelector(
    (state) => state.machines.editMachineMappingLoading
  );
  const deleteLoading = useSelector(
    (state) => state.machines.deleteMachineMappingLoading
  );

  // Get 'mapping' object ID
  const allMachineMappings = useSelector(
    (state) => state.machines.machineMappings
  );
  const thisMapping = allMachineMappings
    .filter((item) => (item.machine_id === openForm.ID ? item : false))
    .pop();

  // Get nodes available in the zone for mapping
  const allNodesInAZone = useSelector((state) => state.nodes.allNodesInAZone);
  const allNodesInAZoneProfiles = useSelector(
    (state) => state.nodes.allNodesInAZoneProfiles
  );
  const MACAddresses = Object.keys(allNodesInAZone).filter((key) =>
    allNodesInAZone[key].length < 2 ? allNodesInAZone[key] : false
  );

  // Get current form data:
  // 1) sensor number:  from thisMapping object
  // 2) node MAC:
  //    1.1) get node ID from thisMapping object
  //    1.2) get node thisNode from allNodesInAZone
  //    1.3) get MAC from thisNode

  const [formData, setFormData] = useState({
    MAC: "",
    sensor: null,
  });
  const [errors, setErrors] = useState({});
  const [expectedResponse, setExpectedResponse] = useState("");
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData({
      ...formData,
      MAC: "",
      sensor: null,
    });
    setErrors({});
    setSuccess(false);
  };

  const handleFormData = (e) => {
    if (e.target.id) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      setErrors({
        ...errors,
        [e.target.id]: null,
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const mapRequestBody = {};

    mapRequestBody._id = thisMapping._id;

    if (formData.MAC !== "") {
      const nodeID = allNodesInAZoneProfiles.map((x) =>
        x.mac === formData.MAC ? x._id : null
      );
      mapRequestBody.node_id = nodeID.filter((x) => x).pop();
    } else mapRequestBody.node_id = null;

    mapRequestBody.sensor_number =
      parseInt(formData.sensor) === 1 || parseInt(formData.sensor) === 2
        ? parseInt(formData.sensor)
        : null;

    setErrors({
      ...errors,
      MAC: formData.MAC === "" ? "Cannot be empty." : null,
      sensor:
        parseInt(formData.sensor) !== 1 && parseInt(formData.sensor) !== 2
          ? "Cannot be empty."
          : null,
    });

    // console.log(mapRequestBody, formData, errors);

    if (
      mapRequestBody._id &&
      Object.values(mapRequestBody).filter((x) => x).length > 1 &&
      Object.values(errors).filter((x) => x).length === 0
    ) {
      setExpectedResponse(mapRequestBody._id);
      editMachineMappingAction(dispatch, mapRequestBody);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this item?")) {
      const requestBody = { id: thisMapping._id };

      setExpectedResponse(requestBody.id);
      deleteMachineMappingAction(dispatch, requestBody);
    }
  };

  const handleCancel = () => {
    if (window.confirm("There are unsaved changes, do you wish to proceed?")) {
      cleanUp();
      toggleEditMappingFormDrawerAction(dispatch);
    }
  };

  useEffect(() => {
    if (response._id === expectedResponse || response.id === expectedResponse) {
      setSuccess(true);
    }
  }, [response]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        cleanUp();
        toggleEditMappingFormDrawerAction(dispatch);
        window.location.href = props.url;
      }, 2000);
    }
  }, [success, dispatch, props]);

  return (
    <Drawer open={openForm.open} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Machine Mapping
          </Typography>
          <form
            noValidate
            className={classes.form}
            onSubmit={(e) => e.preventDefault()}
          >
            {success ? (
              <Grow in={true} {...{ timeout: 500 }}>
                <Button
                  startIcon={<CheckCircleOutlineIcon />}
                  fullWidth
                  className={classes.success}
                  onClick={(e) => e.preventDefault()}
                >
                  Success
                </Button>
              </Grow>
            ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="MAC"
              name="MAC"
              label="SSN MAC Address"
              select
              value={formData.MAC}
              onChange={(e) => handleFormData(e)}
              SelectProps={{
                native: true,
              }}
              color={errors.MAC ? "secondary" : "primary"}
              focused={true}
            >
              <option value={""}></option>
              {MACAddresses.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
            {errors.MAC ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.MAC}
              </Typography>
            ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="sensor"
              name="sensor"
              label="Sensor"
              select
              value={formData.sensor}
              onChange={(e) => handleFormData(e)}
              focused={formData.MAC.length > 0 || errors.sensor ? true : false}
              SelectProps={{
                native: true,
              }}
              color={errors.sensor ? "secondary" : "primary"}
            >
              <option value={null}></option>
              {allNodesInAZone[formData.MAC] ? (
                allNodesInAZone[formData.MAC].length === 0 ? (
                  <option value={1}>Sensor 1</option>
                ) : null
              ) : null}
              {allNodesInAZone[formData.MAC] ? (
                allNodesInAZone[formData.MAC].length === 0 ? (
                  <option value={2}>Sensor 2</option>
                ) : null
              ) : null}
              {allNodesInAZone[formData.MAC] ? (
                allNodesInAZone[formData.MAC].length === 1 ? (
                  allNodesInAZone[formData.MAC][0].Sensor_Number === 1 ? (
                    <option value={2}>Sensor 2</option>
                  ) : (
                    <option value={1}>Sensor 1</option>
                  )
                ) : null
              ) : null}
            </TextField>
            {errors.sensor ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.sensor}
              </Typography>
            ) : null}
            {editLoading ? (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submitLoading}
                onClick={(e) => e.preventDefault()}
              >
                <CircularProgress color="primary" size={20} />
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={(e) => handleSave(e)}
              >
                Save
              </Button>
            )}
            <Button
              fullWidth
              variant="outlined"
              className={classes.submit}
              onClick={(e) => handleCancel(e)}
            >
              Cancel
            </Button>
            <hr className={classes.divider} />
            {deleteLoading ? (
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                className={classes.submitLoading}
                onClick={(e) => e.preventDefault()}
              >
                <CircularProgress color="secondary" size={20} />
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                className={classes.submit}
                color="secondary"
                onClick={(e) => handleDelete(e)}
              >
                Delete
              </Button>
            )}
          </form>
        </div>
      </Container>
    </Drawer>
  );
};

export default EditMachineMapping;
