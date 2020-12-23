import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditFormDrawerAction } from "../../../../../redux/actions/commonAction";
import {
  editWorkshopAction,
  deleteWorkshopAction,
} from "../../../../../redux/actions/workshopsActions";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import Snackbar from "@material-ui/core/Snackbar";

import { makeStyles } from "@material-ui/core/styles";
import { formStyle } from "../../../../../utils/styles";
import { isNotEmpty, requestBodyFormat } from "../../../../../utils/validation";

const useStyles = makeStyles((theme) => formStyle(theme));

const EditWorkshop = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const openForm = useSelector((state) => state.common.toggleEditFormDrawer);
  const response = useSelector((state) => state.workshops.editWorkshopResponse);

  const nameRef = React.useRef();

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [focus, setFocus] = useState({
    name: true,
  });

  const cleanUp = () => {
    setFormData({});
    setErrors({});
    setFocus({ name: true });
    setSuccess(false);
  };

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });

    if (event.key === "Enter") {
      switch (event.target.id) {
        case "name":
          setFocus({
            ...focus,
            [event.target.id]: false,
          });
          break;

        default:
          break;
      }
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (formData.name && isNotEmpty(formData.name)) {
      const requestBody = requestBodyFormat.editWorkshop;
      requestBody.id = openForm.ID;
      requestBody.name = formData.name;

      editWorkshopAction(dispatch, requestBody);
    } else {
      setErrors({
        ...errors,
        name: "Name is required.",
      });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this item?")) {
      const requestBody = requestBodyFormat.deleteWorkshop;
      requestBody.id = openForm.ID;

      deleteWorkshopAction(dispatch, requestBody);
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
            Edit Workshop
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => event.preventDefault()}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              placeholder={errors.name ? errors.name : openForm.name}
              color={errors.name ? "secondary" : "primary"}
              onKeyPress={(e) => handleFormData(e)}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={focus.name}
              inputRef={nameRef}
            />
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

export default EditWorkshop;
