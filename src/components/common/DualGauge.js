import React from "react";
import { useState } from "react";
import colors from "../../utils/colors";

import Highcharts from "highcharts";
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

// const item1OffsetName = 45;
// const item2OffsetName = item1OffsetName - 25;

const item1OffsetValue = 0;
const item2OffsetValue = item1OffsetValue - 25;

const opacity = 0.1;

const colorSets = {
  item1: {
    high: colors.GREEN[500],
    normal: colors.INDIGO[500],
    low: colors.RED[500],
  },
  item2: {
    high: colors.TEAL[500],
    normal: colors.CYAN[500],
    low: colors.ORANGE[500],
  },
};

const getColor = (change, thresholds, colors) => {
  return change >= thresholds.high
    ? colors.high
    : change >= thresholds.low
    ? colors.normal
    : change < thresholds.low
    ? colors.low
    : colors.low;
};

const bg1 = (color1) => ({
  data: [
    {
      color: Highcharts.color(color1).setOpacity(opacity).get(),
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

const bg2 = (color2) => ({
  data: [
    {
      color: Highcharts.color(color2).setOpacity(opacity).get(),
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
  const item1Color = getColor(item1.value, item1.thresholds, colorSets.item1);
  const item2Color = getColor(item2.value, item2.thresholds, colorSets.item2);

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
        // title: {
        //   y: item2OffsetName,
        //   text: item2.name,
        // },
      },
      {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
        // title: {
        //   y: item1OffsetName,
        //   text: item1.name,
        // },
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
            color: item1Color,
            radius: item1OuterRadius,
            innerRadius: item1InnerRadius,
            y: item1.value,
          },
        ],
        dataLabels: {
          enabled: true,
          y: item1OffsetValue,
          format: item1.name + ":" + "{y}" + item1.suffix,
          borderWidth: 0,
          backgroundColor: "none",
          color: item1Color,
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
            color: item2Color,
            radius: item2OuterRadius,
            innerRadius: item2InnerRadius,
            y: item2.value,
          },
        ],
        dataLabels: {
          enabled: true,
          y: item2OffsetValue,
          format: item2.name + ":" + "{y}" + item2.suffix,
          borderWidth: 0,
          backgroundColor: "none",
          color: item2Color,
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
