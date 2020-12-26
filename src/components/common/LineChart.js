import React from "react";
import { useSelector } from "react-redux";

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

const commonOptions = {
  chart: {
    height: 300,
    margin: [25, 25, 25, 25],
    renderTo: "container",
    zoomType: "x",
    borderRadius: 10,
  },
  tooltip: {
    valueDecimals: 2,
    split: false,
    distance: 30,
    padding: 10,
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
    gridLineWidth: 0,
    lineWidth: 0,
    minorGridLineWidth: 0,
    tickColor: "rgb(0,0,0,0)",
  },

  scrollbar: {
    barBackgroundColor: "white",
    barBorderRadius: 1,
    barBorderWidth: 1,
    buttonBackgroundColor: "white",
    buttonBorderWidth: 1,
    buttonArrowColor: "rgba(0,0,0,0.4)",
    buttonBorderRadius: 1,
    rifleColor: "rgba(0,0,0,0.4)",
    trackBackgroundColor: "white",
    trackBorderWidth: 1,
    trackBorderColor: "rgba(0,0,0,0.2)",
    trackBorderRadius: 1,
  },
  navigator: {
    height: 30,
    handles: {
      backgroundColor: "rgb(0,0,0,0)",
      borderColor: "rgb(0,0,0,0)",
    },
    outlineColor: "rgba(0,0,0,0)",
    maskFill: "rgba(0,0,0,0.2)",

    xAxis: {
      gridLineWidth: 0,
      dateTimeLabelFormats,
    },
  },

  rangeSelector: {
    inputEnabled: false,
    verticalAlign: "bottom",
    x: 0,
    y: 0,

    allButtonsEnabled: true,

    buttonPosition: {
      align: "center",
      x: 0,
      y: 0,
    },
    buttons: [
      {
        type: "day",
        count: 1,
        text: "1 Day",
      },
      {
        type: "hour",
        count: 1,
        text: "1 Hour",
      },
      {
        type: "minute",
        count: 5,
        text: "5 Min",
      },
      {
        type: "all",
        text: "All",
      },
    ],
    selected: 2,
    buttonTheme: {
      width: 50,
    },
  },
};

const LineChart = (props) => {
  const togglePersistantSideBar = useSelector(
    (state) => state.common.togglePersistantSideBarAction
  );

  const [chartOptions, setChartOptions] = useState(commonOptions);

  useEffect(() => {
    const defaultChartData = {
      series: [],
      timestamps: [],
      name: "",
      step: "",
      decimal: 0,
      color: 0,
    };
    const { series, timestamps, name, step, color } = props.chartData
      ? props.chartData
      : defaultChartData;

    setChartOptions({
      yAxis: [
        {
          // offset: -20,
          min: 0,
          max: props.yMax ? props.yMax : Math.max(...series),
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
          name: name,
          type: "areaspline",
          step: step,

          color: Highcharts.getOptions().colors[color],
          fillColor: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1,
            },
            stops: [
              [0, Highcharts.getOptions().colors[color]],
              [
                0.6,
                Highcharts.color(Highcharts.getOptions().colors[color])
                  .setOpacity(0.1)
                  .get("rgba"),
              ],
            ],
          },
          threshold: null,
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
