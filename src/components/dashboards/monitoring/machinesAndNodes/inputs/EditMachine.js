import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditFormDrawerAction } from "../../../../../redux/actions/commonAction";
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
import Snackbar from "@material-ui/core/Snackbar";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle, formSlider } from "../../../../../utils/styles";
import { requestBodyFormat } from "../../../../../utils/validation";

const useStyles = makeStyles((theme) => formStyle(theme));

const EditMachine = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector((state) => state.common.toggleEditFormDrawer);
  const response = useSelector((state) => state.machines.editMachineResponse);

  const nameRef = React.useRef();
  const maxLoadRef = React.useRef();

  const [formData, setFormData] = useState({
    name: "",
    maxLoad: 0,
    idleThreshold: 0,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [focus, setFocus] = useState({
    name: true,
    maxLoad: false,
  });

  const cleanUp = () => {
    setFormData({
      name: "",
      maxLoad: 0,
      idleThreshold: 0,
    });
    setErrors({});
    setFocus({
      name: true,
      maxLoad: false,
    });
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

      if (e.key === "Enter") {
        switch (e.target.id) {
          case "name":
            try {
              maxLoadRef.current.focus();
            } catch (error) {
              console.log(error);
            }

            setFocus({
              ...focus,
              [e.target.id]: false,
              maxLoad: true,
            });
            break;

          case "maxLoad":
            setFocus({
              ...focus,
              [e.target.id]: false,
            });
            break;

          default:
            break;
        }
      }
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

    requestBody.name = formData.name !== "" ? formData.name : null;
    requestBody.idle_threshold =
      formData.idleThreshold > 0 ? formData.idleThreshold : null;
    requestBody.max_load =
      parseInt(formData.maxLoad) > 0 ? formData.maxLoad : null;

    setErrors({
      name: formData.name === "" ? "Cannot be empty." : null,
      maxLoad: parseInt(formData.maxLoad) === 0 ? "Cannot be zero." : null,
      idleThreshold: formData.idleThreshold === 0 ? "Cannot be zero." : null,
    });

    if (
      requestBody.idle_threshold &&
      requestBody.max_load &&
      requestBody.name
    ) {
      editMachineAction(dispatch, requestBody);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this item?")) {
      const requestBody = requestBodyFormat.deleteMachine;
      requestBody.id = openForm.ID;

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
    if (response > 0) {
      setSuccess(true);
    }
  }, [response]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        cleanUp();
        toggleEditFormDrawerAction(dispatch);
        window.location.href = props.url;
      }, 1000);
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
              onKeyPress={(e) => handleFormData(e)}
              autoComplete="off"
              focused={errors.name ? true : focus.name}
              inputRef={nameRef}
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
              onKeyPress={(e) => handleFormData(e)}
              autoComplete="off"
              focused={errors.maxLoad ? true : focus.maxLoad}
              inputRef={maxLoadRef}
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
                step={0.05}
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
            <hr className={classes.divider} />
            <Button
              fullWidth
              variant="outlined"
              className={classes.submit}
              color="secondary"
              onClick={(e) => handleDelete(e)}
            >
              Delete
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

export default EditMachine;
