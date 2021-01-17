export const parseEnviromentDataFromSSN = (data) => {
  const packets = data instanceof Array && data.length > 0 ? data : null;

  // Time
  let timestamps = [];
  let timestampEnd = 0;
  let timestampStart = 0;

  // Temperature
  let temperature = [];
  let temperatureNow = 0;
  let temperatureMax = 0;
  let temperatureMin = 0;
  let temperatureAlerts = [];
  let temperatureAlertNow = 0;

  // Humidity
  let humidity = [];
  let humidityNow = 0;
  let humidityMax = 0;
  let humidityMin = 0;
  let humidityAlerts = [];
  let humidityAlertNow = 0;

  if (packets) {
    try {
      const latest = packets.slice(-1)[0];

      // Time
      timestamps = packets.map((packet) => Date.parse(packet.timestamp));
      timestampStart = timestamps[0];
      timestampEnd = timestamps.slice(-1)[0];

      // Temperature
      temperature = packets.map((packet) => {
        return packet.temperature;
      });

      temperatureAlerts = packets.map((packet) => {
        return packet.temperature_alert;
      });

      temperatureNow = latest.temperature;
      temperatureAlertNow = latest.temperature_alert;
      temperatureMax = Math.max(...temperature);
      temperatureMin = Math.min(...temperature);

      // Humidity
      humidity = packets.map((packet) => {
        return packet.humidity;
      });

      humidityAlerts = packets.map((packet) => {
        return packet.humidity_alert;
      });

      humidityNow = latest.humidity;
      humidityAlertNow = latest.humidity_alert;
      humidityMax = Math.max(...humidity);
      humidityMin = Math.min(...humidity);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // Time
    timestamps,
    timestampEnd,
    timestampStart,

    // Temperature
    temperature,
    temperatureAlerts,
    temperatureNow,
    temperatureMax,
    temperatureMin,
    temperatureAlertNow,

    // Humidity
    humidity,
    humidityAlerts,
    humidityNow,
    humidityMax,
    humidityMin,
    humidityAlertNow,
  };
};

export const parseDataFromSSN = (data, timeFilterIndex) => {
  const numOfHours =
    timeFilterIndex === 0
      ? 1
      : timeFilterIndex === 1
      ? 12
      : timeFilterIndex === 2
      ? 24
      : 1;

  const packets = data instanceof Array && data.length > 0 ? data : null;

  // Time
  let timestamps = [];
  let timestampEnd = 0;
  let timestampStart = 0;
  let timestampStartFilter = 0;

  // Enviroment
  let temperature = [];
  let temperatureNow = 0;
  let temperatureMax = 0;
  let temperatureMin = 0;
  let humidity = [];
  let humidityNow = 0;
  let humidityMax = 0;
  let humidityMin = 0;

  // Current
  let loadCurrent = [];
  let currentNow = 0;

  // Power
  let instantPower = [];
  let unitsConsumed = 0;

  //State
  let machineStateStr = [];
  let machineState = [];
  let stateNowDuration = "Unknown";
  let stateNow = "Unknown";

  // Utilization
  let utilization = 0;
  let uptime = "Unknown";
  let downtime = "Unknown";

  if (packets) {
    try {
      const latest = packets.slice(-1)[0];

      // Time
      timestamps = packets.map((packet) => Date.parse(packet.timestamp));
      timestampStart = timestamps[0];
      timestampEnd = timestamps.slice(-1)[0];
      timestampStartFilter = subtractHours(numOfHours, timestampEnd);

      const NumberOfPacketsFilteredByTime = timestamps.map((timestamp) => {
        if (timestamp > timestampStartFilter) {
          return timestamp;
        } else {
          return null;
        }
      });
      const timeFilter = NumberOfPacketsFilteredByTime.filter((x) => x).length;

      // Environment
      temperature = packets.map((packet) => {
        return packet.temperature;
      });
      const temperatureInGivenInterval = temperature.slice(-timeFilter);
      temperatureNow = latest.temperature;
      temperatureMax = Math.max(...temperatureInGivenInterval);
      temperatureMin = Math.min(...temperatureInGivenInterval);

      humidity = packets.map((packet) => {
        return packet.humidity;
      });
      const humidityInGivenInterval = humidity.slice(-timeFilter);
      humidityNow = latest.humidity;
      humidityMax = Math.max(...humidityInGivenInterval);
      humidityMin = Math.min(...humidityInGivenInterval);

      // Load Current
      loadCurrent = packets.map((packet) => {
        return packet.load_current;
      });
      currentNow = latest.load_current;

      //Power
      instantPower = loadCurrent.map((current) => {
        return 1.732 * 0.95 * 400 * current;
      });
      const powerInGivenInterval = instantPower.slice(-timeFilter);
      unitsConsumed = Math.round(
        (arrayAverage(powerInGivenInterval) / 1000) * numOfHours
      );

      // State
      machineStateStr = packets.map((packet) => {
        return packet.status;
      });
      machineState = machineStateStr.map((state) => {
        if (state === "OFF") {
          return 0;
        } else if (state === "IDLE") {
          return 1;
        } else if (state === "ON") {
          return 2;
        } else return 0;
      });
      stateNow = latest.status;
      stateNowDuration = timeDifference(
        latest.machine_state_duration * 1000,
        0
      );
      const statesInGivenInterval = machineState.slice(-timeFilter);

      // Utilization
      const interval = 5;
      let upCount = 0;
      let downCount = 0;
      statesInGivenInterval.map((state, index) => {
        if (state === 2) {
          upCount++;
        } else downCount++;
        return index;
      });
      utilization = Math.round((upCount / statesInGivenInterval.length) * 100);
      const forCovertingToMinutes = 60 / interval;
      uptime = minutesToHours(Math.round(upCount / forCovertingToMinutes));
      downtime = minutesToHours(Math.round(downCount / forCovertingToMinutes));
    } catch (error) {
      console.log(error);
    }
  }

  return {
    // Time
    timestamps,
    timestampEnd,
    timestampStart,
    timestampStartFilter,

    // Enviroment
    temperature,
    temperatureNow,
    temperatureMax,
    temperatureMin,
    humidity,
    humidityNow,
    humidityMax,
    humidityMin,

    // Current
    loadCurrent,
    currentNow,

    // Power
    instantPower,
    unitsConsumed,

    // State
    machineState,
    stateNowDuration,
    stateNow,

    // Utilization
    utilization,
    uptime,
    downtime,
  };
};

const minutesToHours = (minutes) => {
  if (minutes <= 60) {
    return `00:${pad(minutes, 2)}`;
  } else {
    const hh = Math.floor(minutes / 60);
    const mm = minutes - hh * 60;
    return `${pad(hh, 2)}:${pad(mm, 2)}`;
  }
};

const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

export const arrayAverage = (arr) => {
  try {
    const average = arr.reduce((sume, el) => sume + el, 0) / arr.length;
    return average;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export const timeDifference = (date1, date2) => {
  let difference = date1 - date2;

  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;

  let secondsDifference = Math.floor(difference / 1000);

  let days = daysDifference > 0 ? daysDifference + "D " : "";
  let hours = hoursDifference > 0 ? hoursDifference + "H " : "";
  let minutes = minutesDifference > 0 ? minutesDifference + "M " : "";
  let seconds = secondsDifference > 0 ? secondsDifference + "S" : "";

  return days + hours + minutes + seconds;
};

const subtractHours = (h, reference) => {
  const referenceDateObj = new Date(reference);
  return referenceDateObj.getTime() - h * 60 * 60 * 1000;
};
