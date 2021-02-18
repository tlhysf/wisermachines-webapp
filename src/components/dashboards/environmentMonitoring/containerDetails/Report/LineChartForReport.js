import React from "react";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useEffect, useState } from "react";

const dateTimeLabelFormats = {
  second: "%l:%M:%S %P",
  minute: "%l:%M %P",
  hour: "%l %P",
  day: "%e. %b",
  week: "%e. %b",
  month: "%b '%y",
  year: "%Y",
};

const commonOptions = () => ({
  chart: {
    // height: 300,
    margin: [25, 25, 25, 25],
    renderTo: "container",
  },
  tooltip: {
    enabled: false,
  },
  time: {
    useUTC: false,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: "datetime",
    dateTimeLabelFormats,
    gridLineWidth: 2,
    lineWidth: 1,
    minorGridLineWidth: 1,
    tickColor: "rgb(0,0,0,1)",
  },

  navigator: {
    enabled: false,
  },
  scrollbar: {
    enabled: false,
  },
  rangeSelector: {
    enabled: false,
  },
});

const LineChart = (props) => {
  const [chartOptions, setChartOptions] = useState(commonOptions());

  useEffect(() => {
    const defaultChartData = {
      series: [],
      timestamps: [],
      name: "",
      step: "",
      decimal: 0,
      color: "#ffffff",
    };

    // console.dir(props.chartData);

    const {
      series,
      timestamps,
      name,
      step,
      color,
      yMax,
      yMin,
      yLabels,
    } = props.chartData ? props.chartData : defaultChartData;

    setChartOptions({
      yAxis: [
        {
          // offset: -20,
          min: yMin ? yMin : 0,
          max: yMax ? yMax : Math.max(...series),
          categories: yLabels,
        },
      ],
      series: [
        {
          data: (function () {
            let time = timestamps;
            let yaxis = series;
            let i;
            let data = [];

            for (i = 0; i < time.length; ++i) {
              data.push([time[i], yaxis[i]]);
            }
            return data;
          })(),
          step: step,
          name: name,
          type: "line",
          color: color,
          threshold: null,
          enableMouseTracking: false,
        },
      ],
    });
  }, [props]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </div>
  );
};

export default LineChart;
