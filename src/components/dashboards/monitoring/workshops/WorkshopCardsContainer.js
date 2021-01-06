import React from "react";
import Grid from "@material-ui/core/Grid";
import CardWithDualGauge from "../../../common/CardWithDualGauge";
import Card from "../../../common/Card";
import Grow from "@material-ui/core/Grow";

import {
  status,
  info1,
  info2,
  gaugeItem1,
  gaugeItem2,
} from "../../../../data/workshopAndZoneSummaryCard";
import { summaryHeader } from "../../../../data/summaryHeader";

const animationDuration = 500;

export default function WorkshopCards(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {summaryHeader().map((item, index) => {
            return (
              <Grow
                in={true}
                {...{ timeout: animationDuration + index * animationDuration }}
              >
                <Grid item key={index} lg={2} md={4} sm={6} xs={12}>
                  <Card data={item} />
                </Grid>
              </Grow>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {props.allWorkshops.map((item, index) => (
            <Grow
              in={true}
              {...{ timeout: animationDuration + index * animationDuration }}
            >
              <Grid key={index} item lg={3} md={4} sm={12}>
                <CardWithDualGauge
                  data={{
                    name: item.name,
                    ID: item._id,
                    mapping: false,
                    status: status(),
                    info1: info1(),
                    info2: info2(),
                    gaugeItem1: gaugeItem1(),
                    gaugeItem2: gaugeItem2(),
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
