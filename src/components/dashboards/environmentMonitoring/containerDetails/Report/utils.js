export const getSlicedData = (inputData, unit) => {
  // input data is assumed to be of less than one month
  // input data is assumed to be an array of packets

  // output is also array of packets
  const slicedOutputData = {};

  // outlier can be any number other than 1-31 (for days) and 0-23 (for hours)
  const outlier = 100;

  const getValue = (timestamp) => {
    if (unit === "days") {
      return new Date(timestamp).getDate();
    }
    if (unit === "hours") {
      return new Date(timestamp).getHours();
    }
  };

  let saved = outlier;

  const keys = inputData
    .map((item) => {
      const { timestamp } = item;
      const current = getValue(timestamp);

      if (current !== saved) {
        saved = current;
        return timestamp;
      }

      return outlier;
    })
    .filter((x) => x !== outlier);

  for (let i = 0; i < keys.length; i++) {
    const filtered = inputData
      .map((item) => {
        if (getValue(item.timestamp) === getValue(keys[i])) {
          return item;
        }
        return null;
      })
      .filter((x) => x);

    slicedOutputData[String(keys[i])] = filtered;
  }

  return slicedOutputData;
};
