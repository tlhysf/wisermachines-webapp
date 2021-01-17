const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const environmentData = () => {
  let response = [];

  const millisecondsInAnHour = 60 * 60 * 1000;
  const UTCPlus5 = millisecondsInAnHour * 0;

  const IntervalInSeconds = 60 * 5;
  const millisecondsInInterval = 1000 * IntervalInSeconds;
  const totalTimeInDays = 2;
  const noOfTimestamps = (totalTimeInDays * 24 * 3600) / IntervalInSeconds;

  for (let i = noOfTimestamps; i >= 1; i--) {
    const now = Date.now() + UTCPlus5;
    const timestampOfLatestUpdate = now - millisecondsInInterval * i;
    const timestamp = String(new Date(timestampOfLatestUpdate));
    const temperature = randomIntFromInterval(0, 65);
    const humidity = randomIntFromInterval(0, 65);
    const temperature_alert = randomIntFromInterval(-1, 1);
    const humidity_alert = randomIntFromInterval(-1, 1);
    response.push({
      temperature_alert,
      humidity_alert,
      temperature,
      humidity,
      timestamp,
    });
  }

  return response;
};
