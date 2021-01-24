import React from "react";
import { useState } from "react";
// import colors from "../../utils/colors";

import Highcharts from "highcharts";
import solidGauge from "highcharts/modules/solid-gauge";
import highchartsMore from "highcharts/highcharts-more.js";
import HighchartsReact from "highcharts-react-official";

import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

highchartsMore(Highcharts);
solidGauge(Highcharts);

// const fontSize = 12;
const chartWidth = 200;
const trackWidth = 10;
const item1OuterRadius = chartWidth - 100;
const item1InnerRadius = item1OuterRadius - trackWidth;
const item2OuterRadius = item1InnerRadius - 3;
const item2InnerRadius = item2OuterRadius - trackWidth;

// const item1OffsetName = 45;
// const item2OffsetName = item1OffsetName - 25;

// const item1OffsetValue = 0;
// const item2OffsetValue = item1OffsetValue - 20;

const opacity = 0.2;

const getColor = (change, thresholds, colors) => {
  return change >= thresholds.high
    ? colors.high
    : change >= thresholds.low
    ? colors.normal
    : change < thresholds.low
    ? colors.low
    : colors.low;
};

const bg1 = (color1, yMax1) => ({
  data: [
    {
      color: Highcharts.color(color1).setOpacity(opacity).get(),
      radius: item1OuterRadius,
      innerRadius: item1InnerRadius,
      y: yMax1,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  enableMouseTracking: false,
});

const bg2 = (color2, yMax2) => ({
  data: [
    {
      color: Highcharts.color(color2).setOpacity(opacity).get(),
      radius: item2OuterRadius,
      innerRadius: item2InnerRadius,
      y: yMax2,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  enableMouseTracking: false,
});

const commonOptions = (item1, item2, item1Color, item2Color) => {
  return {
    chart: {
      type: "solidgauge",
      // renderTo: "container",
      height: "100%",
      width: chartWidth,
      margin: [0, 0, 0, 0],
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
        outerRadius: "85%",
        innerRadius: 0,
        backgroundColor: "none",
        borderWidth: 0,
      },
    },

    yAxis: [
      {
        min: 0,
        max: item2.yMax,
        lineWidth: 0,
        tickPositions: [],
        // title: {
        //   y: item2OffsetName,
        //   text: item2.name,
        // },
      },
      {
        min: 0,
        max: item1.yMax,
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
      bg1(item1Color, item1.yMax),
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
          enabled: false,
          //   y: item1OffsetValue,
          //   format: `${item1.name}:{y}${item1.suffix}`,
          //   borderWidth: 0,
          //   backgroundColor: "none",
          //   color: item1Color,
          //   shadow: false,
          //   padding: 1,
          //   style: {
          //     //  font
          //     textOutline: "none",
          //     fontSize: fontSize,
          //   },
        },
        enableMouseTracking: false,
      },
      bg2(item2Color, item2.yMax),
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
          enabled: false,
          // y: item2OffsetValue,
          // format: `${item2.name}:{y}${item2.suffix}`,
          // borderWidth: 0,
          // backgroundColor: "none",
          // color: item2Color,
          // shadow: false,
          // padding: 1,
          // style: {
          //   //  font
          //   textOutline: "none",
          //   fontSize: fontSize,
          // },
        },
        enableMouseTracking: false,
      },
    ],
  };
};

const DualGauge = (props) => {
  const { item1, item2, colorSets } = props;

  const item1Color = getColor(
    item1.value,
    item1.thresholds,
    colorSets.gaugeItem1
  );
  const item2Color = getColor(
    item2.value,
    item2.thresholds,
    colorSets.gaugeItem2
  );

  const [chartOptions, setChartOptions] = useState(
    commonOptions(item1, item2, item1Color, item2Color)
  );

  React.useEffect(() => {
    const { item1, item2, colorSets } = props;

    const item1Color = getColor(
      item1.value,
      item1.thresholds,
      colorSets.gaugeItem1
    );
    const item2Color = getColor(
      item2.value,
      item2.thresholds,
      colorSets.gaugeItem2
    );

    setChartOptions(commonOptions(item1, item2, item1Color, item2Color));
  }, [props]);

  // console.log(item1Color, item2Color);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div
        style={{
          position: "absolute",
        }}
      >
        <Tooltip title={item1.name} placement="top" arrow>
          <Typography
            variant="button"
            align="center"
            style={{ padding: 4, color: item1Color, display: "block" }}
          >
            {item1.value}
            {item1.suffix}
          </Typography>
        </Tooltip>
        <Tooltip title={item2.name} placement="bottom" arrow>
          <Typography
            variant="button"
            align="center"
            style={{ padding: 4, color: item2Color, display: "block" }}
          >
            {item2.value}
            {item2.suffix}
          </Typography>
        </Tooltip>
      </div>
    </div>
  );
};

export default DualGauge;
