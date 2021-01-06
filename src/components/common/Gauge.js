import React from "react";
import { useState } from "react";

import Highcharts, { color } from "highcharts";
import solidGauge from "highcharts/modules/solid-gauge";
import highchartsMore from "highcharts/highcharts-more.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const chartSize = 130;
const paneOuterRadius = chartSize - 20;
const trackWidth = 25;
const item1OuterRadius = paneOuterRadius + 0;
const item1InnerRadius = item1OuterRadius - trackWidth;
const item1OffsetValue = -12;

const opacity = 0.2;

const colors = {
  high: 5,
  normal: 4,
  low: 2,
};

const getColor = (value, thresholds, colors) => {
  return value >= thresholds.high
    ? colors.high
    : value >= thresholds.low
    ? colors.normal
    : value < thresholds.low
    ? colors.low
    : color.low;
};

const bg1 = (colorNum) => ({
  data: [
    {
      color: Highcharts.color(Highcharts.getOptions().colors[colorNum])
        .setOpacity(opacity)
        .get(),
      radius: item1OuterRadius,
      innerRadius: item1InnerRadius,
      y: 100,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  enableMouseTracking: false,
});

const commonOptions = (item1) => {
  const item1Color = getColor(item1.value, item1.thresholds, colors);

  return {
    chart: {
      type: "solidgauge",
      height: chartSize,
      width: chartSize,
    },

    title: {
      text: null,
    },

    tooltip: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },

    pane: {
      startAngle: 0,
      endAngle: 360,
      background: {
        outerRadius: paneOuterRadius,
        innerRadius: 0,
        backgroundColor: "none",
        borderWidth: 0,
      },
    },

    yAxis: [
      {
        min: 0,
        //max: 100,
        lineWidth: 0,
        tickPositions: [],
      },
    ],

    plotOptions: {
      solidgauge: {
        linecap: "round",
        rounded: true,
      },
    },

    series: [
      bg1(item1Color),
      {
        // name: item1.name,
        data: [
          {
            color: Highcharts.getOptions().colors[item1Color],
            radius: item1OuterRadius,
            innerRadius: item1InnerRadius,
            y: item1.value,
          },
        ],
        dataLabels: {
          enabled: true,
          y: item1OffsetValue,
          format: "{y} " + item1.suffix,
          borderWidth: 0,
          backgroundColor: "none",
          color: Highcharts.getOptions().colors[item1Color],
          shadow: false,
          style: {
            //  font
            textOutline: "none",
          },
        },
        enableMouseTracking: true,
      },
    ],
  };
};

const Gauge = (props) => {
  const { item1 } = props;
  const [chartOptions] = useState(commonOptions(item1));

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default Gauge;
