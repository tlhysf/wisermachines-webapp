import React from "react";

import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import { smallCard, common } from "../../../../../utils/styles";
import colors from "../../../../../utils/colors";

const useStyles = makeStyles((theme) => common(theme));

export default function CostAndUnitsCard(props) {
  const classes = useStyles();

  const [toggle, setToggle] = React.useState(false);

  const defaultData = props.costData;

  const [icon, setIcon] = React.useState(defaultData.icon);
  const [values, setValues] = React.useState(defaultData.values);

  const setData = (propsData) => {
    const { icon, values } = propsData;
    setIcon(icon);
    setValues(values);
  };

  React.useEffect(() => {
    const { costData, unitsData } = props;
    if (toggle) {
      setData(unitsData);
    } else {
      setData(costData);
    }
  }, [toggle, props]);

  return (
    <Tooltip title={`Click to view ${toggle ? "Cost" : "Units"}`}>
      <ButtonBase
        style={{ height: "100%", width: "100%" }}
        onClick={(e) => setToggle(!toggle)}
      >
        <Grid
          container
          component={Paper}
          direction="row"
          justify="center"
          alignItems="center"
          elevation={2}
          style={{ padding: 12, height: "100%" }}
          className={classes.cardHover}
        >
          <Grid item xs={2}>
            <Paper style={smallCard.iconPaper} elevation={0}>
              {icon}
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper style={smallCard.textPaper} elevation={0}>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item xs={"auto"}>
                  <Typography
                    align="center"
                    variant="h6"
                    style={{ color: colors.BLUEGREY[600] }}
                  >
                    {values.primary}
                  </Typography>
                </Grid>
                <Grid item xs={"auto"}>
                  <Typography
                    align="center"
                    variant="body1"
                    style={{ color: colors.BLUEGREY[500] }}
                  >
                    {values.secondary}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </ButtonBase>
    </Tooltip>
  );
}
