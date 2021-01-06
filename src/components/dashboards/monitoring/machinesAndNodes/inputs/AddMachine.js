import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddFormDrawerAction } from "../../../../../redux/actions/commonAction";
import { addMachineAction } from "../../../../../redux/actions/machinesAndNodesActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import Slider from "@material-ui/core/Slider";
import Snackbar from "@material-ui/core/Snackbar";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle, formSlider } from "../../../../../utils/styles";
import { requestBodyFormat } from "../../../../../utils/validation";

const useStyles = makeStyles((theme) => formStyle(theme));

const AddMachine = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector((state) => state.common.toggleAddFormDrawer);
  const response = useSelector((state) => state.machines.addMachineResponse);
  const allNodesInAZone = useSelector((state) => state.nodes.allNodesInAZone);
  const allNodesInAZoneProfiles = useSelector(
    (state) => state.nodes.allNodesInAZoneProfiles
  );

  const MACAddresses = Object.keys(allNodesInAZone).filter((key) =>
    allNodesInAZone[key].length < 2 ? allNodesInAZone[key] : false
  );

  const [formData, setFormData] = useState({
    name: "",
    maxLoad: 0,
    idleThreshold: 0,
    MAC: "",
    sensor: null,
  });
  const [errors, setErrors] = useState({});
  const [expectedResponse, setExpectedResponse] = useState("");
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData({
      ...formData,
      name: "",
      maxLoad: 0,
      idleThreshold: 0,
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

  const handleSlider = (e, value) => {
    setFormData({
      ...formData,
      idleThreshold: value,
    });
    setErrors({
      ...errors,
      idleThreshold: null,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const addRequestBody = requestBodyFormat.addMachine;

    addRequestBody.name = formData.name !== "" ? formData.name : null;
    addRequestBody.idle_threshold =
      formData.idleThreshold > 0 ? formData.idleThreshold : null;
    addRequestBody.max_load =
      parseInt(formData.maxLoad) > 0 ? formData.maxLoad : null;

    const mapRequestBody = requestBodyFormat.mapMachine;

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
      name: formData.name === "" ? "Cannot be empty." : null,
      maxLoad: parseInt(formData.maxLoad) === 0 ? "Cannot be zero." : null,
      idleThreshold: formData.idleThreshold === 0 ? "Cannot be zero." : null,
      MAC: formData.MAC === "" ? "Cannot be empty." : null,
      sensor:
        parseInt(formData.sensor) !== 1 && parseInt(formData.sensor) !== 2
          ? "Cannot be empty."
          : null,
    });

    // console.log(mapRequestBody, addRequestBody, formData, errors);

    if (
      addRequestBody.idle_threshold &&
      addRequestBody.max_load &&
      addRequestBody.name &&
      mapRequestBody.node_id &&
      mapRequestBody.sensor_number
    ) {
      setExpectedResponse(addRequestBody.name);
      addMachineAction(dispatch, addRequestBody, mapRequestBody);
    }
  };

  const handleCancel = () => {
    if (window.confirm("There are unsaved changes, do you wish to proceed?")) {
      cleanUp();
      toggleAddFormDrawerAction(dispatch);
    }
  };

  useEffect(() => {
    if (response.name === expectedResponse) {
      setSuccess(true);
    }
  }, [response]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        cleanUp();
        toggleAddFormDrawerAction(dispatch);
        window.location.href = props.url;
      }, 1000);
    }
  }, [success, dispatch, props]);

  return (
    <Drawer open={openForm} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Machine
          </Typography>
          <form
            noValidate
            className={classes.form}
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              placeholder={errors.name}
              color={errors.name ? "secondary" : "primary"}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="maxLoad"
              label="Maximum Load"
              name="maxLoad"
              color={errors.maxLoad ? "secondary" : "primary"}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
              defaultValue={0}
              type="number"
              inputProps={{ min: 0 }}
            />
            {errors.maxLoad ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.maxLoad}
              </Typography>
            ) : null}
            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={
                  errors.idleThreshold
                    ? "secondary"
                    : formData.maxLoad > 0
                    ? "primary"
                    : "textSecondary"
                }
              >
                Idle Threshold*
              </Typography>
              <Slider
                disabled={formData.maxLoad > 0 ? false : true}
                defaultValue={0}
                min={0}
                max={parseInt(formData.maxLoad)}
                step={1}
                valueLabelDisplay="auto"
                onChange={(e, value) => handleSlider(e, value)}
                color={errors.idleThreshold ? "secondary" : "primary"}
              />
              {errors.idleThreshold ? (
                <Typography
                  align={"center"}
                  gutterBottom
                  style={formSlider.error}
                  color="secondary"
                >
                  {errors.idleThreshold}
                </Typography>
              ) : null}
            </div>
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
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              onClick={(e) => handleSave(e)}
            >
              Save
            </Button>
            <Button
              fullWidth
              variant="outlined"
              className={classes.submit}
              onClick={(e) => handleCancel(e)}
            >
              Cancel
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={success}
              autoHideDuration={6000}
              message="Success!"
            />
          </form>
        </div>
      </Container>
    </Drawer>
  );
};

export default AddMachine;
