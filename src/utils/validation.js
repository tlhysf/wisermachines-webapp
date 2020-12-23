export const isNotEmpty = (value) => {
  switch (value) {
    case value === undefined:
      return false;
    case value === null:
      return false;
    case typeof value === "object" && Object.keys(value).length === 0:
      return false;
    case typeof value === "string" && value.trim().length === 0:
      return false;
    case typeof value instanceof Array && value.length === 0:
      return false;
    default:
      return true;
  }
};

export const requestBodyFormat = {
  addWorkshop: {
    name: "",
  },
  editWorkshop: {
    id: "",
    name: "",
  },
  deleteWorkshop: {
    id: "",
  },
  addZone: {
    name: "",
    workshop_id: "",
    min_temperature: 0,
    max_temperature: 100,
    min_humidity: 0,
    max_humidity: 100,
  },
  editZone: {
    id: "",
    name: "",
  },
  deleteZone: {
    id: "",
  },
  getMachinesAndNodesInaZone: {
    id: "",
  },
  addMachine: {
    name: "",
    idle_threshold: "",
    max_load: "",
    sensor_voltage_scalar: 0,
  },
  editMachine: {
    id: "",
  },
  deleteMachine: {
    id: "",
  },
  addNode: {
    mac: "",
    sensor_1_rating: null,
    sensor_2_rating: null,
  },
  editNode: {
    id: "",
  },
  deleteNode: {
    id: "",
  },
};
