import { common } from "./actionTypes";

export const filterByTimeAction = (dispatch, timeFilter) =>
  dispatch({
    type: common.filterByTime,
    payload: {
      timeFilter,
    },
  });

export const filterByMachinesOrNodes = (dispatch, machinesOrNodesFilter) => {
  dispatch({
    type: common.filterByNodesOrMachines,
    payload: {
      machinesOrNodesFilter,
    },
  });
};

export const toggleAddFormDrawerAction = (dispatch) => {
  dispatch({
    type: common.toggleAddFormDrawer,
  });
};

export const toggleEditFormDrawerAction = (dispatch, ID, title) => {
  dispatch({
    type: common.toggleEditFormDrawer,
    payload: {
      ID: ID,
      name: title,
    },
  });
};
