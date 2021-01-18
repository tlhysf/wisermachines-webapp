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

const commonOptions = (large) => ({
  chart: {
    height: large ? 400 : 300,
    margin: [25, 25, 25, 25],
    renderTo: "container",
    zoomType: "x",
    borderRadius: 10,
  },
  tooltip: {
    valueDecimals: 2,
    split: false,
    padding: 10,
    distance: 10,
    stickOnContact: true,
    followPointer: true,
    followTouchMove: true,
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
        type: "all",
        text: "All",
      },
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
    ],
    selected: 2,
    buttonTheme: {
      width: 45,
    },
  },
});

const LineChart = (props) => {
  const [chartOptions, setChartOptions] = useState(commonOptions(props.large));

  useEffect(() => {
    const defaultChartData = {
      series: [],
      timestamps: [],
      name: "",
      step: "",
      decimal: 0,
      color: "#ffffff",
    };
    const {
      series,
      timestamps,
      name,
      step,
      color,
      yMax,
      type,
    } = props.chartData ? props.chartData : defaultChartData;

    const { series2, series2Name, series2Color } = props.chartData;
    const { series3, series3Name, series3Color } = props.chartData;
    setChartOptions({
      yAxis: [
        {
          // offset: -20,
          min: 0,
          max: yMax ? yMax : Math.max(...series),
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
          type: type ? type : "areaspline",

          color: color,
          fillColor: {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1,
            },
            stops: [
              [0, color],
              [0.6, Highcharts.color(color).setOpacity(0.1).get("rgba")],
            ],
          },
          threshold: null,
        },
        series2
          ? {
              data: (function () {
                let time = timestamps;
                let yaxis = series2 ? series2 : [];
                let i;
                let data = [];

                for (i = 0; i < time.length; ++i) {
                  data.push([time[i], yaxis[i]]);
                }
                return data;
              })(),
              name: series2Name ? series2Name : "",
              type: "line",

              color: series2Color,

              threshold: null,
            }
          : {},
        series3
          ? {
              data: (function () {
                let time = timestamps;
                let yaxis = series3 ? series3 : [];
                let i;
                let data = [];

                for (i = 0; i < time.length; ++i) {
                  data.push([time[i], yaxis[i]]);
                }
                return data;
              })(),
              name: series3Name ? series3Name : "",
              type: "line",

              color: series3Color,

              threshold: null,
            }
          : {},
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
