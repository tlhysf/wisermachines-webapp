import React from "react";
import Grid from "@material-ui/core/Grid";
import NodeCard from "./NodeCard";

export default function NodeCards(props) {
  const { allNodesInAZone } = props;

  const listOfNodeIDs = Object.keys(allNodesInAZone);

  const listOfMachines = Object.values(allNodesInAZone);

  let ListOfNodeToMachineMapping = listOfMachines.map(
    (machinesMappedToNodeAtIndex, node_index) => {
      let nodeToMachineMapping = {};

      nodeToMachineMapping["mac"] = listOfNodeIDs[node_index];

      if (machinesMappedToNodeAtIndex[0]) {
        machinesMappedToNodeAtIndex.map((machine, machine_index) => {
          if (machine.Sensor_Number) {
            nodeToMachineMapping[machine.Sensor_Number] = machine.name;
          }
          return machine_index;
        });
      }

      return nodeToMachineMapping;
    }
  );

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
          {ListOfNodeToMachineMapping.map((item, index) => (
            <Grid key={index} item xl={2} md={3} sm={6} xs={12}>
              <NodeCard data={{ name: item.mac }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
