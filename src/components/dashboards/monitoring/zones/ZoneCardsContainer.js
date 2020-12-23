import React from "react";
import Grid from "@material-ui/core/Grid";
import CardWithRadialChart from "../../../common/CardWithRadialChart";

export default function ZoneCards(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          {props.allZonesInAWorkshop.map((item, index) => (
            <Grid key={index} item xl={2} md={3} sm={6} xs={12}>
              <CardWithRadialChart
                data={{ name: item.name, ID: item._id }}
                childPageLabel={"machines"}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
