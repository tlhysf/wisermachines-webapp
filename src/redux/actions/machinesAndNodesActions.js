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
        const allNodesInAZone = data;
        const allNodesConfig = {
          method: "get",
          url: keys.server + "/nodes",
          headers: {
            "Content-Type": "application/json",
          },
        };

        axios(allNodesConfig)
          .then((res) => {
            const { data } = res;
            if (isNotEmpty(data)) {
              const allNodes = data;
              const allNodesInAZoneProfiles = Object.keys(allNodesInAZone).map(
                (node) => {
                  for (let i = 0; i < allNodes.length; i++) {
                    if (node === allNodes[i].mac) return allNodes[i];
                  }
                }
              );

              dispatch({
                type: machinesAndNodes.getAllNodesInAZone,
                payload: {
                  allNodesInAZoneProfiles,
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

export const addNodeAction = (dispatch, createNodeBody, zoneID) => {
  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  const createNodeConfig = {
    method: "post",
    url: keys.server + "/node",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(createNodeBody),
  };

  axios(createNodeConfig)
    .then((res) => {
      if (res.status === 201) {
        const nodeID = res.data._id;
        const MAC = res.data.mac;

        const mapNodeToTheZoneBody = {
          zone_id: zoneID,
          node_id: nodeID,
        };

        const mapNodeToTheZoneConfig = {
          method: "post",
          url: keys.server + "/ZoneMapping",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(mapNodeToTheZoneBody),
        };

        axios(mapNodeToTheZoneConfig)
          .then((res) => {
            if (res.status === 201) {
              dispatch({
                type: machinesAndNodes.addNode,
                payload: {
                  response: MAC,
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
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
        const MAC = res.data.mac;
        dispatch({
          type: machinesAndNodes.editOrDeleteNode,
          payload: {
            response: MAC,
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
