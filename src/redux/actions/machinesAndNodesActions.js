import { machinesAndNodes } from "./actionTypes";
import keys from "../../utils/keys";
import { isNotEmpty } from "../../utils/validation";
import axios from "axios";

export const getAllMachinesAndNodesInAZoneAction = (dispatch, zoneID) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  var data = JSON.stringify({ id: zoneID });

  const config = {
    method: "get",
    url: keys.postman + "/Zone/Node_Machine_Data/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      const { data } = res;
      if (isNotEmpty(data)) {
        let allMachinesInAZone = [];
        const allNodesInAZone = data;
        Object.values(allNodesInAZone).map((node, node_index) => {
          if (node[0]) {
            node.map((machine, machine_index) => {
              allMachinesInAZone = [...allMachinesInAZone, machine];
              return machine_index;
            });
          } else {
            console.log("error: unexpected response", data);
          }
          return node_index;
        });

        if (isNotEmpty(allMachinesInAZone) && allMachinesInAZone[0]) {
          dispatch({
            type: machinesAndNodes.getAllMachinesAndNodesInAZone,
            payload: {
              allMachinesInAZone,
              allNodesInAZone,
              zoneID,
            },
          });
        } else {
          console.log(
            "error: unexpected response",
            allNodesInAZone,
            allMachinesInAZone
          );
        }
      } else {
        console.log("error: unexpected response", data);
      }
    })
    .catch((error) => {
      console.log(error);
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
    url: keys.postman + "/Machine",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: machinesAndNodes.addMachine,
          payload: {
            data: res.data,
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

export const editMachineAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "patch",
    url: keys.postman + "/machine",
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

export const deleteMachineAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.machinesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "delete",
    url: keys.postman + "/machine",
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

export const addNodeAction = (dispatch, body) => {
  dispatch({
    type: machinesAndNodes.nodesLoading,
  });

  const data = JSON.stringify(body);
  const config = {
    method: "post",
    url: keys.postman + "/node",
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
    url: keys.postman + "/node",
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
    url: keys.postman + "/node",
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
