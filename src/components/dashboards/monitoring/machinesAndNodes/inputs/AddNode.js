import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddFormDrawerAction } from "../../../../../redux/actions/commonAction";
import { addNodeAction } from "../../../../../redux/actions/machinesAndNodesActions";

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

const AddNode = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const openForm = useSelector((state) => state.common.toggleAddFormDrawer);
  const response = useSelector((state) => state.nodes.addNodeResponse);

  const MACRef = React.useRef();

  const [formData, setFormData] = useState({
    MAC: "",
    sensor1Rating: sensorRatings[0].value,
    sensor2Rating: sensorRatings[0].value,
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [focus, setFocus] = useState({
    MAC: true,
    sensor1Rating: false,
    sensor2Rating: false,
  });

  const cleanUp = () => {
    setFormData({
      MAC: "",
      sensor1Rating: sensorRatings[0].value,
      sensor2Rating: sensorRatings[0].value,
    });
    setErrors({});
    setFocus({
      MAC: true,
      sensor1Rating: sensorRatings[0].value,
      sensor2Rating: sensorRatings[0].value,
    });
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      switch (e.target.id) {
        case "MAC":
          setFocus({
            ...focus,
            [e.target.id]: false,
            sensor1Rating: true,
            sensor2Rating: true,
          });
          break;

        default:
          break;
      }
    }
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
      formData.MAC.length === 12 && isHex(formData.MAC) ? formData.MAC : null;
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
      addNodeAction(dispatch, requestBody);
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
        cleanUp();
        toggleAddFormDrawerAction(dispatch);
        // window.location.href = props.url;
      }, 1000);
    }
  }, [success, dispatch, props]);

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
              onKeyPress={(e) => handleKeyPress(e)}
              autoComplete="off"
              focused={errors.MAC ? true : focus.MAC}
              inputRef={MACRef}
              inputProps={{
                maxLength: 12,
              }}
              helperText={`${formData.MAC.length}/${12}`}
            />
            <div style={formSlider.container}>
              <Typography
                align={"center"}
                gutterBottom
                style={formSlider.title}
                color={
                  errors.sensor1Rating
                    ? "secondary"
                    : focus.sensor1Rating
                    ? "primary"
                    : "textSecondary"
                }
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
                color={
                  errors.sensor2Rating
                    ? "secondary"
                    : focus.sensor2Rating
                    ? "primary"
                    : "textSecondary"
                }
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
export default AddNode;
