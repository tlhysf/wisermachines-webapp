const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const machineNamePrefix = "Air-Compressor-";
const zoneNamePrefix = "Factory-";

export const placeholderRes = {
  getAllWorkshops: [
    { _id: "5fdf356185790c04ec5d4310", name: "Balochistan", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "drying workshop", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "Stitching Workshop", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "Looming Workshop", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "Workshop-123", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "worskhop-456", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "workshop-789", __v: 0 },
    { _id: "5fdf356185790c04ec5d4310", name: "Workshop-1011", __v: 0 },
  ],

  getAllZones: [
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdb23113edf4e2a3889fe35",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdf356185790c04ec5d4310",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdf356185790c04ec5d4310",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdf356185790c04ec5d4310",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdb23113edf4e2a3889fe35",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdf356185790c04ec5d4310",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdf356185790c04ec5d4310",
      __v: 0,
    },
    {
      _id: "5fdb233b3edf4e2a3889fe36",
      name: zoneNamePrefix + randomIntFromInterval(0, 100),
      workshop_id: "5fdf356185790c04ec5d4310",
      __v: 0,
    },
  ],

  getAllMachines: [
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: "Air-Compressor-" + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
    {
      _id: "5fdb23ee3edf4e2a3889fe48",
      name: machineNamePrefix + randomIntFromInterval(0, 100),
      idle_threshold: randomIntFromInterval(0, 20),
      max_load: randomIntFromInterval(20, 100),
      sensor_voltage_scalar: 0,
      __v: 0,
    },
  ],

  getAllMachineMappings: [
    {
      _id: "5fdb240f3edf4e2a3889fe4f",
      machine_id: "5fdb23ee3edf4e2a3889fe48",
      node_id: "5fdb237e3edf4e2a3889fe37",
      sensor_number: 1,
      __v: 0,
    },
    {
      _id: "5fdb240f3edf4e2a3889fe4f",
      machine_id: "5fdb23ee3edf4e2a3889fe48",
      node_id: "5fdb237e3edf4e2a3889fe37",
      sensor_number: 1,
      __v: 0,
    },
    {
      _id: "5fdb240f3edf4e2a3889fe4f",
      machine_id: "5fdb23ee3edf4e2a3889fe48",
      node_id: "5fdb237e3edf4e2a3889fe37",
      sensor_number: 1,
      __v: 0,
    },
  ],

  getAllNodeToMachineMappingInAZone: {
    "70:B3:D5:FE:4C:00": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 1,
      },
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 2,
      },
    ],
    "70:B3:D5:FE:4C:01": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 1,
      },
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 2,
      },
    ],
    "70:B3:D5:FE:4C:02": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 1,
      },
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 2,
      },
    ],
    "70:B3:D5:FE:4C:03": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 1,
      },
    ],
    "70:B3:D5:FE:4C:04": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 2,
      },
    ],
    "70:B3:D5:FE:4C:05": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 2,
      },
    ],
    "70:B3:D5:FE:4C:06": [
      {
        _id: "5fdb23ee3edf4e2a3889fe48",
        name: machineNamePrefix + randomIntFromInterval(0, 100),
        Sensor_Number: 1,
      },
    ],
    "70:B3:D5:FE:4C:07": [],
  },

  getAllNodes: [
    {
      _id: "5fdb237e3edf4e2a3889fe37",
      mac: "70:B3:D5:FE:4C:00",
      sensor_1_rating: 60,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdf35a085790c04ec5d4338",
      mac: "70:B3:D5:FE:4C:01",
      sensor_1_rating: 50,
      sensor_2_rating: 50,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fe475695163c82ed4f57e39",
      mac: "70:B3:D5:FE:4C:02",
      sensor_1_rating: 30,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdb237e3edf4e2a3889fe40",
      mac: "70:B3:D5:FE:4C:03",
      sensor_1_rating: 60,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdf35a085790c04ec5d4341",
      mac: "70:B3:D5:FE:4C:04",
      sensor_1_rating: 50,
      sensor_2_rating: 50,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fe475695163c82ed4f57e42",
      mac: "70:B3:D5:FE:4C:05",
      sensor_1_rating: 30,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdb237e3edf4e2a3889fe43",
      mac: "70:B3:D5:FE:4C:06",
      sensor_1_rating: 60,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdf35a085790c04ec5d4344",
      mac: "70:B3:D5:FE:4C:07",
      sensor_1_rating: 50,
      sensor_2_rating: 50,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fe475695163c82ed4f57e45",
      mac: "70:B3:D5:FE:4C:08",
      sensor_1_rating: 30,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdb237e3edf4e2a3889fe46",
      mac: "70:B3:D5:FE:4C:09",
      sensor_1_rating: 60,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fdf35a085790c04ec5d4347",
      mac: "70:B3:D5:FE:4C:10",
      sensor_1_rating: 50,
      sensor_2_rating: 50,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
    {
      _id: "5fe475695163c82ed4f57e48",
      mac: "70:B3:D5:FE:4C:11",
      sensor_1_rating: 30,
      sensor_2_rating: 0,
      min_temperature: 10,
      max_temperature: 60,
      min_humidity: 0,
      max_humidity: 100,
      __v: 0,
    },
  ],
};
