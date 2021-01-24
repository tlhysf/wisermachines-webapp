import React from "react";
import Grid from "@material-ui/core/Grid";
import NodeCard from "./NodeCard";
import Grow from "@material-ui/core/Grow";

const animationDuration = 200;

export default function NodeCards(props) {
  const { allNodesInAZone } = props;

  const listOfNodeMACs = Object.keys(allNodesInAZone);

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
          {listOfNodeMACs.map((mac, index) => (
            <Grow
              key={index}
              in={true}
              {...{ timeout: animationDuration + index * animationDuration }}
            >
              <Grid key={index} item lg={3} md={4} xs={12}>
                <NodeCard
                  data={{
                    name: mac,
                    sensor1: allNodesInAZone[mac][0],
                    sensor2: allNodesInAZone[mac][1],
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
