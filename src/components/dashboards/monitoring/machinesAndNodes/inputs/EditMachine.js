import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditFormDrawerAction } from "../../../../../redux/actions/commonActions";
import {
  editMachineAction,
  deleteMachineAction,
} from "../../../../../redux/actions/machinesAndNodesActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import Slider from "@material-ui/core/Slider";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Grow from "@material-ui/core/Grow";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle, formSlider } from "../../../../../utils/styles";
import { requestBodyFormat } from "../../../../../utils/validation";

const useStyles = makeStyles((theme) => formStyle(theme));

const EditMachine = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector((state) => state.common.toggleEditFormDrawer);
  const response = useSelector((state) => state.machines.editMachineResponse);
  const editLoading = useSelector((state) => state.machines.editMachineLoading);
  const deleteLoading = useSelector(
    (state) => state.machines.deleteMachineLoading
  );

  const allMachinesInAZone = useSelector(
    (state) => state.machines.allMachinesInAZone
  );

  const index = allMachinesInAZone.findIndex(
    (item) => item._id === openForm.ID
  );

  const thisMachine = index < 0 ? {} : allMachinesInAZone[index];

  const [formData, setFormData] = useState({});
  const [expectedResponse, setExpectedResponse] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData({
      name: "",
      maxLoad: 0,
      idleThreshold: 0,
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
      idleThreshold: null,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const requestBody = requestBodyFormat.editMachine;

    requestBody.id = openForm.ID;

    if (formData.name === "") {
      setErrors({
        ...errors,
        name: "Cannot be empty",
      });
    } else {
      if (formData.name === thisMachine.name) {
        // Same value as before
      } else {
        requestBody.name = formData.name;
      }
    }

    if (parseInt(formData.maxLoad) === 0) {
      setErrors({
        ...errors,
        maxLoad: "Cannot be zero",
      });
    } else {
      if (formData.maxLoad === thisMachine.max_load) {
        // Same value as before
      } else {
        requestBody.max_load = formData.maxLoad;
      }
    }

    if (formData.idleThreshold === 0) {
      setErrors({
        ...errors,
        idleThreshold: "Cannot be zero",
      });
    } else {
      if (formData.idleThreshold === thisMachine.idle_threshold) {
        // Same value as before
      } else {
        requestBody.idle_threshold = formData.idleThreshold;
      }
    }

    if (
      requestBody.id &&
      Object.keys(requestBody).length > 1 &&
      Object.values(errors).filter((x) => x).length === 0
    ) {
      setExpectedResponse(requestBody.id);
      editMachineAction(dispatch, requestBody);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this item?")) {
      const requestBody = requestBodyFormat.deleteMachine;
      requestBody.id = openForm.ID;

      setExpectedResponse(requestBody.id);
      deleteMachineAction(dispatch, requestBody);
    }
  };

  const handleCancel = () => {
    if (window.confirm("There are unsaved changes, do you wish to proceed?")) {
      cleanUp();
      toggleEditFormDrawerAction(dispatch);
    }
  };

  useEffect(() => {
    setFormData({
      name: thisMachine.name,
      maxLoad: thisMachine.max_load,
      idleThreshold: thisMachine.idle_threshold,
    });
  }, [thisMachine]);

  useEffect(() => {
    if (response.id === expectedResponse) {
      setSuccess(true);
    }
  }, [response]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        cleanUp();
        toggleEditFormDrawerAction(dispatch);
        window.location.href = props.url;
      }, 2000);
    }
  }, [success, dispatch, props]);

  return (
    <Drawer open={openForm.open} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Machine
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
              id="name"
              label="Name"
              name="name"
              placeholder={errors.name ? errors.name : formData.name}
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
              defaultValue={formData.maxLoad}
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
                defaultValue={formData.idleThreshold}
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

export default EditMachine;
