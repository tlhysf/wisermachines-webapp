import React from "react";
import Grid from "@material-ui/core/Grid";
import CardWithDualGauge from "../../../common/CardWithDualGauge";
import Card from "../../../common/Card";

import {
  status,
  info1,
  info2,
} from "../../../../data/workshopAndZoneSummaryCard";
import { summaryHeader } from "../../../../data/summaryHeader";

export default function WorkshopCards(props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {summaryHeader().map((item, index) => {
            return (
              <Grid item key={index} lg={2} md={4} sm={6} xs={12}>
                <Card data={item} />
              </Grid>
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
            <Grid key={index} item xl={2} md={3} sm={6} xs={12}>
              <CardWithDualGauge
                data={{
                  name: item.name,
                  ID: item._id,
                  mapping: false,
                  status: status(),
                  info1: info1(),
                  info2: info2(),
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
