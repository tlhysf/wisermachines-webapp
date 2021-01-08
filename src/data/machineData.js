const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const maxCurrent = randomIntFromInterval(20, 100);

const getStatus = (current) => {
  const status = randomIntFromInterval(0, 2);
  switch (status) {
    case 0:
      return "OFF";
    case 1:
      return "IDLE";
    case 2:
      return "ON";
    default:
      return "OFF";
  }
};

export const machineData = () => {
  const millisecondsInAnHour = 60 * 60 * 1000;
  const UTCPlus5 = millisecondsInAnHour * 0;

  const IntervalInSeconds = 60 * 5;
  const millisecondsInInterval = 1000 * IntervalInSeconds;
  const totalTimeInDays = 2;
  const noOfTimestamps = (totalTimeInDays * 24 * 3600) / IntervalInSeconds;

  let response = [];

  for (let i = noOfTimestamps; i >= 1; i--) {
    const now = Date.now() + UTCPlus5;
    const timestampOfLatestUpdate = now - millisecondsInInterval * i;
    const timestamp = String(new Date(timestampOfLatestUpdate));
    const load_current = randomIntFromInterval(0, maxCurrent);
    const status = getStatus();
    const machine_state_duration = randomIntFromInterval(0, 24 * 3600); // seconds
    const temperature = randomIntFromInterval(0, 80);
    const humidity = randomIntFromInterval(0, 100);
    response.push({
      load_current,
      status,
      machine_state_duration,
      temperature,
      humidity,
      timestamp,
    });
  }

  return response;
};

export const liveMachineData = () => {
  const send = true;

  const timestamp = String(new Date());
  const load_current = randomIntFromInterval(0, maxCurrent);
  const status = getStatus();
  const machine_state_duration = randomIntFromInterval(0, 24 * 3600); // seconds
  const temperature = randomIntFromInterval(0, 80);
  const humidity = randomIntFromInterval(0, 100);

  if (send) {
    return {
      load_current,
      status,
      machine_state_duration,
      temperature,
      humidity,
      timestamp,
    };
  } else {
    return null;
  }
};
