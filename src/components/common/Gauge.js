import React from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const defaultColor = "#181818";
const defaultUnit = "Percent";
const defaultValue = "0";

const options = {
  chart: {
    type: "radialBar",
  },
  grid: {
    padding: {
      top: -10,
      bottom: -10,
    },
  },
  fill: {
    type: "solid",
  },
  stroke: {
    lineCap: "round",
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: "70%",
      },
      track: {
        margin: 0,
      },

      dataLabels: {
        showOn: "always",
        name: {
          show: true,
          offsetY: 15,
          color: "#111",
          fontSize: "12px",
        },
        value: {
          offsetY: -20,
          color: "#111",
          fontSize: "16px",
          show: true,
          formatter: function (val) {
            return parseInt(val);
          },
        },
      },
    },
  },
};

const Gauge = (props) => {
  const { gaugeColor, gaugeValue, gaugeUnit } = props.data;

  const [optionsState, setOptions] = useState({
    ...options,
    labels: [defaultUnit],
    colors: [defaultColor],
  });
  const [variables, setVariables] = useState({
    series: [defaultValue],
  });

  useEffect(() => {
    setOptions({
      ...options,
      labels: [gaugeUnit],
      colors: [gaugeColor ? gaugeColor : defaultColor],
    });
    setVariables({
      series: [gaugeValue],
    });
  }, [gaugeColor, gaugeUnit, gaugeValue, props]);

  return (
    <div>
      <Chart
        options={optionsState}
        series={variables.series}
        type="radialBar"
        height={150}
      />
    </div>
  );
};

export default Gauge;
