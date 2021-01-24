import React from "react";
import Grid from "@material-ui/core/Grid";
import { DashboardSummaryCardMinimalVersion } from "../../../common/DashboardSummaryCard";
import Grow from "@material-ui/core/Grow";

const animationDuration = 500;

export default function Cards(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {props.all.map((item, index) => (
            <Grow
              key={index}
              in={true}
              {...{ timeout: animationDuration + index * animationDuration }}
            >
              <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
                <DashboardSummaryCardMinimalVersion
                  data={{
                    name: item.name,
                    ID: item._id,
                    mapping: false,
                  }}
                />
              </Grid>
            </Grow>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
