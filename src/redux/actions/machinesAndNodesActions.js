import { machinesAndNodes } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";
import { placeholderRes } from "../../data/common";

const loadingTime = 2000;

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

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (isNotEmpty(data)) {
          // Need to filter all machines in the zone by zone ID
          const allMachinesInAZone = data.filter((x) => x);
          dispatch({
            type: machinesAndNodes.getAllMachinesInAZone,
            payload: { allMachinesInAZone, zoneID },
          });
        } else {
          console.log("error: unexpected response", data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    setTimeout(() => {
      dispatch({
        type: machinesAndNodes.getAllMachinesInAZone,
        payload: { allMachinesInAZone: placeholderRes.getAllMachines, zoneID },
      });
    }, loadingTime);
  }
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

  if (!keys.showMockData) {
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
                const allNodes = data.filter((x) => x);
                let allNodesInAZoneProfiles = Object.keys(allNodesInAZone).map(
                  (node) => {
                    for (let i = 0; i < allNodes.length; i++) {
                      if (node === allNodes[i].mac) return allNodes[i];
                    }
                  }
                );

                allNodesInAZoneProfiles = allNodesInAZoneProfiles.filter(
                  (x) => x
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
  } else {
    dispatch({
      type: machinesAndNodes.getAllNodesInAZone,
      payload: {
        allNodesInAZoneProfiles: placeholderRes.getAllNodes,
        allNodesInAZone: placeholderRes.getAllNodeToMachineMappingInAZone,
        zoneID,
      },
    });
  }
};

export const getAllMachineMappingsAction = (dispatch) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/MachineMappings",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (isNotEmpty(data)) {
          const allMachineMappings = data.filter((x) => x);
          dispatch({
            type: machinesAndNodes.getAllMachineMappings,
            payload: allMachineMappings,
          });
        } else {
          console.log("error: unexpected response", data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    dispatch({
      type: machinesAndNodes.getAllMachineMappings,
      payload: placeholderRes.getAllMachineMappings,
    });
  }
};

export const addMachineAction = (dispatch, addRequestBody, mapRequestBody) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const data = JSON.stringify(addRequestBody);
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
        mapRequestBody.machine_id = res.data._id;

        const mapRequestConfig = {
          method: "post",
          url: keys.server + "/MachineMapping",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify(mapRequestBody),
        };

        axios(mapRequestConfig)
          .then((res) => {
            if (res.status === 201) {
              dispatch({
                type: machinesAndNodes.addMachine,
                payload: {
                  // should be response body
                  response: addRequestBody,
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
            // should be response body
            response: body,
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
            // should be response body
            response: body,
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

        const mapNodeToTheZoneBody = {
          zone_id: zoneID,
          node_id: nodeID,
        };

        console.log(zoneID);
        console.log(mapNodeToTheZoneBody);

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
                  // should be response body
                  response: createNodeBody,
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
        dispatch({
          type: machinesAndNodes.editOrDeleteNode,
          payload: {
            // should be response body
            response: body,
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

  console.log(body);

  dispatch({
    type: machinesAndNodes.editOrDeleteNode,
    payload: {
      // should be response body
      response: body,
    },
  });

  // const data = JSON.stringify(body);
  // const config = {
  //   method: "delete",
  //   url: keys.server + "/node",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // };

  // axios(config)
  //   .then((res) => {
  //     console.log(res);
  //     if (res.status === 200) {
  //       dispatch({
  //         type: machinesAndNodes.editOrDeleteNode,
  //         payload: {
  //           // should be response body
  //           response: body,
  //         },
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};
