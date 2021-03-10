import React from "react";
import { useState } from "react";

import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";

const commonOptions = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: "pie",
  },
  legend: {
    layout: "vertical",
    align: "right",
    verticalAlign: "middle",
    floating: true,
    x: 0,
    y: 20,
  },
  credits: {
    enabled: false,
  },
  exporting: {
    enabled: false,
  },
  title: {
    text: "Duty Cycle",
  },
  tooltip: {
    pointFormat: "{series.name}: <b>{point.y} Hrs</b>",
  },
  accessibility: {
    point: {
      valueSuffix: "Hrs",
    },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: "pointer",
      dataLabels: {
        enabled: true,
        format: "<b>{point.name}</b><br>{point.y} Hrs",
        distance: -50,
      },
      showInLegend: true,
    },
  },
  series: [
    {
      name: "Hours",
      colorByPoint: true,
      data: [
        {
          name: "Off-Load",
          y: 61,
        },
        {
          name: "On-Load",
          y: 11,
        },
        {
          name: "Shutdown",
          y: 10,
        },
      ],
    },
  ],
};

const DutyCyclePieChart = (props) => {
  const [chartOptions, setChartOptions] = useState(commonOptions);

  return (
    <div>
      <PieChart highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default DutyCyclePieChart;
