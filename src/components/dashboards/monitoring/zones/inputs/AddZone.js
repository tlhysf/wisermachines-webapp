import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddFormDrawerAction } from "../../../../../redux/actions/commonActions";
import { addZoneAction } from "../../../../../redux/actions/zonesActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Grow from "@material-ui/core/Grow";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle } from "../../../../../utils/styles";
import { isNotEmpty, requestBodyFormat } from "../../../../../utils/validation";

const useStyles = makeStyles((theme) => formStyle(theme));

const AddZone = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openForm = useSelector((state) => state.common.toggleAddFormDrawer);
  const response = useSelector((state) => state.zones.addZoneResponse);
  const loading = useSelector((state) => state.zones.addZoneLoading);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData({});
    setErrors({});
    setSuccess(false);
  };

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (formData.name && isNotEmpty(formData.name)) {
      const requestBody = requestBodyFormat.addZone;
      requestBody.name = formData.name;
      requestBody.workshop_id = props.params.workshopID;

      addZoneAction(dispatch, requestBody);
    } else {
      setErrors({
        ...errors,
        name: "Name is required.",
      });
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
            Add Zone
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

export default AddZone;
