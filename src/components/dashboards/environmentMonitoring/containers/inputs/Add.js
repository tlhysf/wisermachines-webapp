import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddFormDrawerAction } from "../../../../../redux/actions/commonActions";
import { addZoneAction } from "../../../../../redux/actions/machineMonitoring/zonesActions";

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
  name: "",
  workshop_id: "",
  min_temperature: 0,
  max_temperature: 0,
  min_humidity: 0,
  max_humidity: 0,
};

const Add = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openForm = useSelector((state) => state.common.toggleAddFormDrawer);
  const response = useSelector((state) => state.zones.addZoneResponse);
  const loading = useSelector((state) => state.zones.addZoneLoading);

  initialFormData.workshop_id = useSelector(
    (state) => state.environmentMonitoring.containersPage.workshopID
  );

  const [formData, setFormData] = useState(initialFormData);
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

    if (
      Object.values(checkErrors).filter((x) => x).length === 0 &&
      formData.workshop_id !== null
    ) {
      addZoneAction(dispatch, formData);
    }
  };

  const handleCancel = () => {
    if (window.confirm("There are unsaved changes, do you wish to proceed?")) {
      cleanUp();
      toggleAddFormDrawerAction(dispatch);
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
        toggleAddFormDrawerAction(dispatch);
        cleanUp();
        window.location.href = props.url;
      }, 2000);
    }
  }, [success, dispatch, props]);

  return (
    <Drawer open={openForm} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add
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
              placeholder={errors.name}
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
              defaultValue={0}
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
                disabled={formData.max_temperature > 0 ? false : true}
                defaultValue={0}
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
              defaultValue={0}
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
                disabled={formData.max_humidity > 0 ? false : true}
                defaultValue={0}
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

export default Add;
