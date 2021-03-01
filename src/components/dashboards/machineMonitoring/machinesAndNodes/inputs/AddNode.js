import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddFormDrawerAction } from "../../../../../redux/actions/commonActions";
import {
  addNodeAction,
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
  string = string.split("");
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

const formatToMAC = (string) => {
  const array = Array.from(string);

  /*eslint-disable */
  // 2, 4 + 1, 6 + 2, 8 + 3, 10 + 4;
  for (let i = 0, j = 2; i < 5, j < 12; i++, j += 2) {
    array.splice(j + i, 0, ":");
  }
  /*eslint-enable */

  const result = array.join().split(",").join("");

  return result;
};

export const sensorRatings = [
  {
    value: 10,
    label: "",
  },
  {
    value: 20,
    label: "",
  },
  {
    value: 30,
    label: "",
  },
  {
    value: 40,
    label: "",
  },
  {
    value: 50,
    label: "",
  },
  {
    value: 60,
    label: "",
  },
  {
    value: 70,
    label: "",
  },
  {
    value: 80,
    label: "",
  },
  {
    value: 90,
    label: "",
  },
  {
    value: 100,
    label: "",
  },
];

const AddNode = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector((state) => state.common.toggleAddFormDrawer);
  const response = useSelector((state) => state.nodes.addNodeResponse);
  const zoneID = useSelector((state) => state.machines.zoneID);
  const loading = useSelector((state) => state.nodes.addNodeLoading);

  const [formData, setFormData] = useState({
    MAC: "",
    sensor1Rating: sensorRatings[0].value,
    sensor2Rating: sensorRatings[0].value,
  });

  const [errors, setErrors] = useState({});
  const [expectedResponse, setExpectedResponse] = useState("");
  const [success, setSuccess] = useState(false);

  const cleanUp = () => {
    setFormData({
      MAC: "",
      sensor1Rating: sensorRatings[0].value,
      sensor2Rating: sensorRatings[0].value,
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

    const requestBody = requestBodyFormat.addNode;

    requestBody.mac =
      formData.MAC.length === 12 && isHex(formData.MAC)
        ? formatToMAC(formData.MAC)
        : null;
    requestBody.sensor_1_rating =
      formData.sensor1Rating > 0 ? formData.sensor1Rating : null;
    requestBody.sensor_2_rating =
      formData.sensor2Rating > 0 ? formData.sensor2Rating : null;

    setErrors({
      MAC:
        formData.MAC === "" || formData.MAC.length < 12 || !isHex(formData.MAC)
          ? "Invalid MAC Address"
          : null,
      sensor1Rating: formData.sensor1Rating === 0 ? "Cannot be zero." : null,
      sensor2Rating: formData.sensor2Rating === 0 ? "Cannot be zero." : null,
    });

    if (
      requestBody.mac &&
      requestBody.sensor_1_rating &&
      requestBody.sensor_2_rating
    ) {
      setExpectedResponse(requestBody.mac);
      addNodeAction(dispatch, requestBody, zoneID);
    }
  };

  const handleCancel = () => {
    if (window.confirm("There are unsaved changes, do you wish to proceed?")) {
      cleanUp();
      toggleAddFormDrawerAction(dispatch);
    }
  };

  useEffect(() => {
    // console.log(response.mac, expectedResponse);
    if (response.mac === expectedResponse) {
      setSuccess(true);
    } else setSuccess(false);
  }, [response, expectedResponse]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        toggleAddFormDrawerAction(dispatch);
        cleanUp();
        getAllNodesInAZoneAction(dispatch, zoneID);
      }, 2000);
    }
  }, [success, dispatch, zoneID]);

  return (
    <Drawer open={openForm} anchor="right" onClose={(e) => handleCancel()}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Add Node
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
              placeholder={errors.MAC}
              value={errors.MAC ? "" : formData.MAC ? formData.MAC : ""}
              color={errors.MAC ? "secondary" : "primary"}
              onChange={(e) => handleFormData(e)}
              autoComplete="off"
              focused={true}
              inputProps={{
                maxLength: 12,
              }}
              helperText={"Example: 001AC27B0047"}
            />
            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={errors.sensor1Rating ? "secondary" : "primary"}
              >
                sensor 1 (A)*
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
                sensor 2 (A)*
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
export default AddNode;
