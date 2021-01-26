import { machines, nodes } from "../actionTypes";
import keys from "../../../utils/keys";
import { isNotEmpty } from "../../../utils/validation";
import axios from "axios";
import { httpRequestErrorAction } from "../errorActions";
import { placeholderRes } from "../../../data/common";

const loadingTime = 1000;

export const getAllMachinesInAZoneAction = (dispatch, zoneID) => {
  dispatch({
    type: machines.machinesLoading,
    payload: zoneID,
  });

  const config = {
    method: "get",
    url: keys.server + "/zone/Summary/" + zoneID,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (isNotEmpty(data)) {
          // console.log(data);
          const allMachinesInAZone = data.machines_data;
          const zoneSummary = data.zone_summary;
          dispatch({
            type: machines.getAllMachinesInAZone,
            payload: { allMachinesInAZone, zoneID, zoneSummary },
          });
        } else {
          console.log("error: unexpected response", data);
        }
      })
      .catch((error) => {
        // httpRequestErrorAction(error, dispatch, machines)
      });
  } else {
    setTimeout(() => {
      dispatch({
        type: machines.getAllMachinesInAZone,
        payload: { allMachinesInAZone: placeholderRes.getAllMachines, zoneID },
      });
    }, loadingTime);
  }
};

export const getAllNodesInAZoneAction = (dispatch, zoneID) => {
  dispatch({
    type: nodes.nodesLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/Zone/Node_Machine_Data/" + zoneID,
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(config.url);

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

          console.log(allNodesConfig.url);

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
                    return null;
                  }
                );

                allNodesInAZoneProfiles = allNodesInAZoneProfiles.filter(
                  (x) => x
                );

                dispatch({
                  type: nodes.getAllNodesInAZone,
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
            .catch((error) => httpRequestErrorAction(error, dispatch, nodes));
        } else {
          console.log("error: unexpected response", data);
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, nodes));
  } else {
    setTimeout(() => {
      dispatch({
        type: nodes.getAllNodesInAZone,
        payload: {
          allNodesInAZoneProfiles: placeholderRes.getAllNodes,
          allNodesInAZone: placeholderRes.getAllNodeToMachineMappingInAZone,
          zoneID,
        },
      });
    }, loadingTime);
  }
};

export const getAllMachineMappingsAction = (dispatch) => {
  dispatch({
    type: machines.machinesLoading,
  });

  const config = {
    method: "get",
    url: keys.server + "/MachineMappings",
    headers: {
      "Content-Type": "application/json",
    },
  };

  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        const { data } = res;
        if (isNotEmpty(data)) {
          const allMachineMappings = data.filter((x) => x);
          dispatch({
            type: machines.getAllMachineMappings,
            payload: allMachineMappings,
          });
        } else {
          console.log("error: unexpected response", data);
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, machines));
  } else {
    setTimeout(() => {
      dispatch({
        type: machines.getAllMachineMappings,
        payload: placeholderRes.getAllMachineMappings,
      });
    }, loadingTime);
  }
};

// *** POST and PATCH request related to machines ***

export const addMachineAction = (dispatch, addRequestBody, mapRequestBody) => {
  dispatch({
    type: machines.addMachineLoading,
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

  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          mapRequestBody.machine_id = res.data._id;

          const mapRequestConfig = {
            method: "post",
            url: keys.server + "/MachineMapping",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(mapRequestBody),
          };

          console.log(mapRequestConfig.url);

          axios(mapRequestConfig)
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                dispatch({
                  type: machines.addMachine,
                  payload: {
                    // should be response body
                    response: addRequestBody,
                  },
                });
              }
            })
            .catch((error) =>
              httpRequestErrorAction(error, dispatch, machines)
            );
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, machines));
  } else {
    setTimeout(() => {
      dispatch({
        type: machines.addMachine,
        payload: {
          // should be response body
          response: addRequestBody,
        },
      });
    }, loadingTime);
  }
};

export const editMachineAction = (dispatch, body) => {
  dispatch({
    type: machines.editMachineLoading,
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
  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: machines.editOrDeleteMachine,
            payload: {
              // should be response body
              response: body,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, machines));
  } else {
    // console.log(body);
    setTimeout(() => {
      dispatch({
        type: machines.editOrDeleteMachine,
        payload: {
          // should be response body
          response: body,
        },
      });
    }, loadingTime);
  }
};

export const deleteMachineAction = (dispatch, body) => {
  dispatch({
    type: machines.deleteMachineLoading,
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
  console.log(config.url);
  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: machines.editOrDeleteMachine,
            payload: {
              // should be response body
              response: body,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, machines));
  } else {
    setTimeout(() => {
      dispatch({
        type: machines.editOrDeleteMachine,
        payload: {
          // should be response body
          response: body,
        },
      });
    }, loadingTime);
  }
};

export const editMachineMappingAction = (dispatch, body) => {
  dispatch({
    type: machines.editMachineMappingLoading,
  });

  // Hit API end-point here

  setTimeout(() => {
    dispatch({
      type: machines.editMachineMapping,
      payload: {
        // should be response body
        response: body,
      },
    });
  }, loadingTime);
};

export const deleteMachineMappingAction = (dispatch, body) => {
  dispatch({
    type: machines.deleteMachineMappingLoading,
  });

  // Hit API end-point here

  setTimeout(() => {
    dispatch({
      type: machines.editMachineMapping,
      payload: {
        // should be response body
        response: body,
      },
    });
  }, loadingTime);
};

// *** POST and PATCH request related to nodes ***

export const addNodeAction = (dispatch, createNodeBody, zoneID) => {
  dispatch({
    type: nodes.addNodeLoading,
  });

  const createNodeConfig = {
    method: "post",
    url: keys.server + "/node",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(createNodeBody),
  };

  console.log(createNodeConfig.url);

  if (!keys.showMockData) {
    axios(createNodeConfig)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          const nodeID = res.data._id;

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

          console.log(mapNodeToTheZoneConfig.url);

          axios(mapNodeToTheZoneConfig)
            .then((res) => {
              if (res.status === 200 || res.status === 201) {
                dispatch({
                  type: nodes.addNode,
                  payload: {
                    // should be response body
                    response: createNodeBody,
                  },
                });
              }
            })
            .catch((error) => httpRequestErrorAction(error, dispatch, nodes));
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, nodes));
  } else {
    setTimeout(() => {
      dispatch({
        type: nodes.addNode,
        payload: {
          // should be response body
          response: createNodeBody,
        },
      });
    }, loadingTime);
  }
};

export const editNodeAction = (dispatch, body) => {
  dispatch({
    type: nodes.editNodeLoading,
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
  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: nodes.editOrDeleteNode,
            payload: {
              // should be response body
              response: body,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, nodes));
  } else {
    setTimeout(() => {
      dispatch({
        type: nodes.editOrDeleteNode,
        payload: {
          // should be response body
          response: body,
        },
      });
    }, loadingTime);
  }
};

export const deleteNodeAction = (dispatch, body) => {
  dispatch({
    type: nodes.deleteNodeLoading,
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
  console.log(config.url);

  if (!keys.showMockData) {
    axios(config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: nodes.editOrDeleteNode,
            payload: {
              // should be response body
              response: body,
            },
          });
        }
      })
      .catch((error) => httpRequestErrorAction(error, dispatch, nodes));
  } else {
    setTimeout(() => {
      dispatch({
        type: nodes.editOrDeleteNode,
        payload: {
          // should be response body
          response: body,
        },
      });
    }, loadingTime);
  }
};
