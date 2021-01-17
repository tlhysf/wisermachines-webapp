import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditFormDrawerAction } from "../../../../../redux/actions/commonActions";
import { editZoneAction } from "../../../../../redux/actions/machineMonitoring/zonesActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Grow from "@material-ui/core/Grow";
import Slider from "@material-ui/core/Slider";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle, formSlider } from "../../../../../utils/styles";

const useStyles = makeStyles((theme) => formStyle(theme));

const initialFormData = {
  id: "",
  workshop_id: "",
  name: "",
  min_temperature: 0,
  max_temperature: 0,
  min_humidity: 0,
  max_humidity: 0,
};

const Edit = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openForm = useSelector((state) => state.common.toggleEditFormDrawer);
  const response = useSelector((state) => state.zones.editZoneResponse);
  const loading = useSelector((state) => state.zones.editZoneLoading);

  let thisZone = props.all.filter((x) => x._id === openForm.ID).pop();
  thisZone = thisZone ? thisZone : {};

  const [formData, setFormData] = useState(thisZone);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccess(false);
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSlider1 = (e, value) => {
    setFormData({
      ...formData,
      min_temperature: value,
    });
    setErrors({
      ...errors,
      min_temperature: null,
    });
  };

  const handleSlider2 = (e, value) => {
    setFormData({
      ...formData,
      min_humidity: value,
    });
    setErrors({
      ...errors,
      min_humidity: null,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const checkErrors = {
      name: formData.name === "" ? "Cannot be empty" : null,
      max_temperature: formData.max_temperature === 0 ? "Cannot be zero" : null,
      max_humidity: formData.max_humidity === 0 ? "Cannot be zero" : null,
    };

    setErrors(checkErrors);

    // change _id in thisZone to id
    const thisZoneCopy = { ...thisZone };
    thisZoneCopy["id"] = thisZoneCopy["_id"];
    delete thisZoneCopy._id;
    delete thisZoneCopy.__v;

    const requestBody = formData;

    requestBody.id = thisZone._id;
    requestBody.workshop_id = thisZone.workshop_id;

    const checkSameAsBefore =
      Object.keys(requestBody).filter(
        (key) => requestBody[key] !== thisZoneCopy[key]
      ).length === 0;

    if (
      Object.values(checkErrors).filter((x) => x).length === 0 &&
      !checkSameAsBefore
    ) {
      editZoneAction(dispatch, formData);
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
      name: thisZone.name,
      min_temperature: thisZone.min_temperature,
      max_temperature: thisZone.max_temperature,
      min_humidity: thisZone.min_humidity,
      max_humidity: thisZone.max_humidity,
    });
  }, [
    thisZone.name,
    thisZone.min_temperature,
    thisZone.max_temperature,
    thisZone.min_humidity,
    thisZone.max_humidity,
  ]);

  useEffect(() => {
    if (response > 0) {
      setSuccess(true);
    }
  }, [response]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toggleEditFormDrawerAction(dispatch);
        cleanUp();
        window.location.href = props.url;
      }, 2000);
    }
  }, [success, dispatch, props]);

  return (
    <Drawer open={openForm.open} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit
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
              placeholder={errors.name ? errors.name : thisZone.name}
              color={errors.name ? "secondary" : "primary"}
              onKeyPress={(e) => handleFormData(e)}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="max_temperature"
              label="Max Temperature"
              name="max_temperature"
              color={errors.max_temperature ? "secondary" : "primary"}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
              defaultValue={thisZone.max_temperature}
              type="number"
              inputProps={{ min: 0 }}
            />
            {errors.max_temperature ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.max_temperature}
              </Typography>
            ) : null}

            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={
                  errors.min_temperature
                    ? "secondary"
                    : formData.max_temperature > 0
                    ? "primary"
                    : "textSecondary"
                }
              >
                Min_Temperature*
              </Typography>
              <Slider
                // disabled={formData.max_temperature > 0 ? false : true}
                defaultValue={thisZone.min_temperature}
                min={0}
                max={parseInt(formData.max_temperature)}
                step={1}
                valueLabelDisplay="auto"
                onChange={(e, value) => handleSlider1(e, value)}
                color={errors.min_temperature ? "secondary" : "primary"}
              />
              {errors.min_temperature ? (
                <Typography
                  align={"center"}
                  gutterBottom
                  style={formSlider.error}
                  color="secondary"
                >
                  {errors.min_temperature}
                </Typography>
              ) : null}
            </div>

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="max_humidity"
              label="Max Humidity"
              name="max_humidity"
              color={errors.max_humidity ? "secondary" : "primary"}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
              defaultValue={thisZone.max_humidity}
              type="number"
              inputProps={{ min: 0 }}
            />
            {errors.max_humidity ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.max_humidity}
              </Typography>
            ) : null}

            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={
                  errors.min_humidity
                    ? "secondary"
                    : formData.max_humidity > 0
                    ? "primary"
                    : "textSecondary"
                }
              >
                Min_Humidity*
              </Typography>
              <Slider
                // disabled={formData.max_humidity > 0 ? false : true}
                defaultValue={thisZone.min_humidity}
                min={0}
                max={parseInt(formData.max_humidity)}
                step={1}
                valueLabelDisplay="auto"
                onChange={(e, value) => handleSlider2(e, value)}
                color={errors.min_humidity ? "secondary" : "primary"}
              />
              {errors.min_humidity ? (
                <Typography
                  align={"center"}
                  gutterBottom
                  style={formSlider.error}
                  color="secondary"
                >
                  {errors.min_humidity}
                </Typography>
              ) : null}
            </div>

            {loading ? (
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
          </form>
        </div>
      </Container>
    </Drawer>
  );
};

export default Edit;
