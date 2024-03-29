import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleEditFormDrawerAction } from "../../../../../redux/actions/commonActions";
import {
  editNodeAction,
  deleteNodeAction,
  getAllNodesInAZoneAction,
} from "../../../../../redux/actions/machineMonitoring/machinesAndNodesActions";

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

const isHex = (string) => {
  let results = [];
  string = string.toLowerCase();
  string = string.split(":").join("").split("");
  string.forEach((element, stringIndex) => {
    const hex = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];

    for (let i = 0; i < hex.length; i++) {
      if (element === hex[i]) {
        results[stringIndex] = true;
        break;
      } else {
        results[stringIndex] = false;
      }
    }
  });

  return !results.includes(false);
};

const sensorRatings = [
  {
    value: 10,
    label: "10 A",
  },
  {
    value: 30,
    label: "30 A",
  },
  {
    value: 50,
    label: "50 A",
  },
  {
    value: 80,
    label: "80 A",
  },
  {
    value: 100,
    label: "100 A",
  },
];

const EditNode = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector((state) => state.common.toggleEditFormDrawer);
  const response = useSelector((state) => state.nodes.editNodeResponse);

  const editLoading = useSelector((state) => state.nodes.editNodeLoading);
  const deleteLoading = useSelector((state) => state.nodes.deleteNodeLoading);

  const zoneID = useSelector((state) => state.machines.zoneID);

  // Get this node
  const allNodesInAZoneProfiles = useSelector(
    (state) => state.nodes.allNodesInAZoneProfiles
  );
  const index = allNodesInAZoneProfiles.findIndex(
    (item) => item.mac === openForm.name
  );
  const thisNode = index < 0 ? {} : allNodesInAZoneProfiles[index];

  const [formData, setFormData] = useState({
    MAC: "",
    sensor1Rating: 0,
    sensor2Rating: 0,
  });

  const [errors, setErrors] = useState({});
  const [expectedResponse, setExpectedResponse] = useState("");
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData({
      MAC: "",
      sensor1Rating: 0,
      sensor2Rating: 0,
    });
    setErrors({});
    setSuccess(false);
  };

  const handleFormData = (e) => {
    if (e.target.id)
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    setErrors({
      [e.target.id]: null,
    });
  };

  const handleSlider1 = (e, value) => {
    setFormData({
      ...formData,
      sensor1Rating: value,
    });
    setErrors({
      sensor1Rating: null,
    });
  };

  const handleSlider2 = (e, value) => {
    setFormData({
      ...formData,
      sensor2Rating: value,
    });
    setErrors({
      sensor1Rating: null,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // console.log(formData, thisNode);

    const requestBody = requestBodyFormat.editNode;

    requestBody.id = thisNode._id;

    if (formData.MAC.length !== 17 || !isHex(formData.MAC)) {
      setErrors({
        ...errors,
        MAC: "Invalid MAC",
      });
    } else {
      if (formData.MAC === thisNode.mac) {
        // Same value as before
      } else {
        requestBody.mac = formData.MAC;
      }
    }

    if (formData.sensor1Rating === thisNode.sensor_1_rating) {
      // Same value as before
    } else {
      requestBody.sensor_1_rating = formData.sensor1Rating;
    }

    if (formData.sensor2Rating === thisNode.sensor_2_rating) {
      // Same value as before
    } else {
      requestBody.sensor_2_rating = formData.sensor2Rating;
    }

    if (
      requestBody.id &&
      Object.keys(requestBody).length > 1 &&
      Object.values(errors).filter((x) => x).length === 0
    ) {
      setExpectedResponse(requestBody.id);
      // console.log(requestBody);
      editNodeAction(dispatch, requestBody);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete this item?")) {
      const requestBody = requestBodyFormat.deleteNode;
      requestBody.id = thisNode._id;

      setExpectedResponse(requestBody.id);
      deleteNodeAction(dispatch, requestBody);
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
      MAC: thisNode.mac,
      sensor1Rating: thisNode.sensor_1_rating,
      sensor2Rating: thisNode.sensor_2_rating,
    });
  }, [thisNode.mac, thisNode.sensor_1_rating, thisNode.sensor_2_rating]);

  useEffect(() => {
    if (response.id === expectedResponse) {
      setSuccess(true);
    } else setSuccess(false);
  }, [response, expectedResponse]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        cleanUp();
        toggleEditFormDrawerAction(dispatch);
        getAllNodesInAZoneAction(dispatch, zoneID);
      }, 2000);
    }
  }, [success, dispatch, zoneID]);

  return (
    <Drawer open={openForm.open} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Node
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
              label="MAC"
              name="MAC"
              placeholder={thisNode.mac}
              defaultValue={thisNode.mac}
              color={errors.MAC ? "secondary" : "primary"}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
              inputProps={{
                maxLength: 17,
              }}
              helperText={"E.g. 00:0a:95:9d:68:16"}
            />
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
            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={errors.sensor1Rating ? "secondary" : "primary"}
              >
                Sensor 1*
              </Typography>
              <Slider
                min={
                  sensorRatings
                    .map((item) => item)
                    .slice(0, 1)
                    .pop().value
                }
                valueLabelFormat={(value) =>
                  sensorRatings.map((rating) =>
                    rating.value === value ? rating.value : null
                  )
                }
                step={null}
                valueLabelDisplay="auto"
                marks={sensorRatings}
                onChange={(e, value) => handleSlider1(e, value)}
                color={errors.sensor1Rating ? "secondary" : "primary"}
                defaultValue={thisNode.sensor_1_rating}
              />
            </div>
            {errors.sensor1Rating ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.sensor1Rating}
              </Typography>
            ) : null}

            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={errors.sensor2Rating ? "secondary" : "primary"}
              >
                Sensor 2*
              </Typography>
              <Slider
                min={
                  sensorRatings
                    .map((item) => item)
                    .slice(0, 1)
                    .pop().value
                }
                valueLabelFormat={(value) =>
                  sensorRatings.map((rating) =>
                    rating.value === value ? rating.value : null
                  )
                }
                step={null}
                valueLabelDisplay="auto"
                marks={sensorRatings}
                onChange={(e, value) => handleSlider2(e, value)}
                color={errors.sensor2Rating ? "secondary" : "primary"}
                defaultValue={thisNode.sensor_2_rating}
              />
            </div>
            {errors.sensor2Rating ? (
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.error}
                color="secondary"
              >
                {errors.sensor2Rating}
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
export default EditNode;
