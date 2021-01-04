import React from "react";
import { useState } from "react";

import Highcharts, { color } from "highcharts";
import solidGauge from "highcharts/modules/solid-gauge";
import highchartsMore from "highcharts/highcharts-more.js";
import HighchartsReact from "highcharts-react-official";

highchartsMore(Highcharts);
solidGauge(Highcharts);

const paneOuterRadius = 70;
const trackWidth = 12;
const item1OuterRadius = paneOuterRadius + 40;
const item1InnerRadius = item1OuterRadius - trackWidth;
const item2OuterRadius = item1InnerRadius - 6;
const item2InnerRadius = item2OuterRadius - trackWidth;

const item1OffsetName = 45;
const item2OffsetName = item1OffsetName - 25;

const item1OffsetValue = item1OffsetName - 32;
const item2OffsetValue = item1OffsetValue - 35;

const opacity = 0.2;

const colors = {
  item1: {
    high: 0,
    normal: 2,
    low: 3,
  },
  item2: {
    high: 5,
    normal: 4,
    low: 6,
  },
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

const bg2 = (colorNum) => ({
  data: [
    {
      color: Highcharts.color(Highcharts.getOptions().colors[colorNum])
        .setOpacity(opacity)
        .get(),
      radius: item2OuterRadius,
      innerRadius: item2InnerRadius,
      y: 100,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  enableMouseTracking: false,
});

const commonOptions = (item1, item2) => {
  const item1Color = getColor(item1.value, item1.thresholds, colors.item1);
  const item2Color = getColor(item2.value, item2.thresholds, colors.item2);

  return {
    chart: {
      type: "solidgauge",
      height: "100%",
      margin: [5, 5, 5, 5],
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
        title: {
          y: item2OffsetName,
          text: item2.name,
        },
      },
      {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
        title: {
          y: item1OffsetName,
          text: item1.name,
        },
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
        name: item1.name,
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
      bg2(item2Color),
      {
        name: item2.name,
        data: [
          {
            color: Highcharts.getOptions().colors[item2Color],
            radius: item2OuterRadius,
            innerRadius: item2InnerRadius,
            y: item2.value,
          },
        ],
        dataLabels: {
          enabled: true,
          y: item2OffsetValue,
          format: "{y} " + item2.suffix,
          borderWidth: 0,
          backgroundColor: "none",
          color: Highcharts.getOptions().colors[item2Color],
          shadow: false,
          style: {
            textOutline: "none",
          },
        },
        enableMouseTracking: true,
      },
    ],
  };
};

const DualGauge = (props) => {
  const { item1, item2 } = props;
  const [chartOptions, setChartOptions] = useState(commonOptions(item1, item2));

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default DualGauge;
