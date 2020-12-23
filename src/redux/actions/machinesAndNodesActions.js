import { machinesAndNodes } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";

export const getAllMachinesInAZoneAction = (dispatch, zoneID) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/machines",
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((res) => {
      const { data } = res;
      if (isNotEmpty(data) && data[0]) {
        const allMachinesInAZone = data;
        if (isNotEmpty(allMachinesInAZone) && allMachinesInAZone[0]) {
          dispatch({
            type: machinesAndNodes.getAllMachinesInAZone,
            payload: { allMachinesInAZone, zoneID },
          });
        } else {
          console.log("error: unexpected response", allMachinesInAZone);
        }
      } else {
        console.log("error: unexpected response", data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAllNodesInAZoneAction = (dispatch, zoneID) => {
  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/Zone/Node_Machine_Data/" + zoneID,
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((res) => {
      const { data } = res;
      if (isNotEmpty(data)) {
        let allMappedMachinesInAZone = [];
        const allNodesInAZone = data;
        // Object.values(allNodesInAZone).map((node, node_index) => {
        //   if (node[0]) {
        //     node.map((machine, machine_index) => {
        //       allMappedMachinesInAZone = [...allMappedMachinesInAZone, machine];
        //       return machine_index;
        //     });
        //   } else {
        //     console.log("error: unexpected response", data);
        //   }
        //   return node_index;
        // });

        // if (
        //   isNotEmpty(allMappedMachinesInAZone) &&
        //   allMappedMachinesInAZone[0]
        // ) {
        //   dispatch({
        //     type: machinesAndNodes.getAllNodesInAZone,
        //     payload: {
        //       allMachinesInAZone: allMappedMachinesInAZone,
        //       allNodesInAZone,
        //       zoneID,
        //     },
        //   });
        // } else {
        //   console.log(
        //     "error: unexpected response",
        //     allNodesInAZone,
        //     allMappedMachinesInAZone
        //   );
        // }
        dispatch({
          type: machinesAndNodes.getAllNodesInAZone,
          payload: {
            allMappedMachinesInAZone,
            allNodesInAZone,
            zoneID,
          },
        });
      } else {
        console.log("error: unexpected response", data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addMachineAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "post",
    url: keys.server + "/Machine",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        dispatch({
          type: machinesAndNodes.addMachine,
          payload: {
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editMachineAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "patch",
    url: keys.server + "/machine",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: machinesAndNodes.editOrDeleteMachine,
          payload: {
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteMachineAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "delete",
    url: keys.server + "/machine",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: machinesAndNodes.editOrDeleteMachine,
          payload: {
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const addNodeAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "post",
    url: keys.server + "/node",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: machinesAndNodes.addNode,
          payload: {
            // response: res.data,
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const editNodeAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "patch",
    url: keys.server + "/node",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: machinesAndNodes.editOrDeleteNode,
          payload: {
            // response: res.data,
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteNodeAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "delete",
    url: keys.server + "/node",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: machinesAndNodes.editOrDeleteNode,
          payload: {
            // response: res.data,
            response: Math.random() + 1,
          },
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
