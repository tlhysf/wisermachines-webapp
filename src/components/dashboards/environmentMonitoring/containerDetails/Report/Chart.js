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

const commonOptions = (hideXAxis) => ({
  chart: {
    height: "200",
    width: "500",
    renderTo: "container",
    // marginBottom: hideXAxis ? 0 : 60,
    // marginTop: hideXAxis ? 10 : 0,
    // marginLeft: 20,
    // marginRight: 25,
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
    tickInterval: 1000 * 1000,
    type: "datetime",
    startOnTick: true,
    dateTimeLabelFormats,
    gridLineWidth: 2,
    lineWidth: 1,
    minorGridLineWidth: 1,
    tickColor: hideXAxis ? "rgb(0,0,0,0)" : "rgb(0,0,0,1)",
    labels: {
      enabled: hideXAxis ? false : true,
    },
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
  const [chartOptions, setChartOptions] = useState(
    commonOptions(props.hideXAxis)
  );

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
      // yMin,
      yLabels,
    } = props.chartData ? props.chartData : defaultChartData;

    setChartOptions({
      yAxis: [
        {
          offset: 25,
          min: Math.min(...series),
          max: Math.max(...series),
          showLastLabel: true,
          categories: yLabels,
          // labels: {
          //   align: "left",
          //   reserveSpace: 20,
          // },
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
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={chartOptions}
    />
  );
};

export default LineChart;
