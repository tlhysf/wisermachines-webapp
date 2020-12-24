import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";

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
    height: "50%",
    margin: [20, 20, 20, 20],
    renderTo: "container",
    zoomType: "x",
    borderRadius: 10,
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
    barBackgroundColor: "rgb(0,0,0,0.3)",
    barBorderColor: "rgb(0,0,0,0)",
    buttonArrowColor: "rgb(0,0,0,0)",
    buttonBackgroundColor: "rgb(0,0,0,0)",
    buttonBorderColor: "rgb(0,0,0,0)",
    rifleColor: "rgb(0,0,0,0)",
    trackBackgroundColor: "rgb(0,0,0,0)",
    trackBorderColor: "rgb(0,0,0,0)",
  },
  navigator: {
    handles: {
      backgroundColor: "rgb(0,0,0,0)",
      borderColor: "rgb(0,0,0,0)",
    },
    outlineColor: "rgba(0,0,0,0.1)",
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
  const [chartOptions, setChartOptions] = useState(commonOptions);

  useEffect(() => {
    const defaultChartData = {
      series: [],
      timeStamps: [],
      name: "",
      step: "",
      decimal: 0,
      color: 0,
    };
    const { series, timeStamps, name, step, decimal, color } = props.chartData
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
            let time = timeStamps;
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
          tooltip: {
            valueDecimals: decimal,
          },
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
    <Paper elevation={0}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={"stockChart"}
        options={chartOptions}
      />
    </Paper>
  );
};

export default LineChart;
