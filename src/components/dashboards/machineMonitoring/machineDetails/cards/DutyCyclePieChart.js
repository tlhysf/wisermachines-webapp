import React from "react";
import { useState } from "react";

import Highcharts from "highcharts";
import PieChart from "highcharts-react-official";

const commonOptions = (offLoad, onLoad, shutdown) => {
  const removeZero = (name, value) => {
    return value === 0
      ? null
      : {
          name: name,
          y: value,
        };
  };

  const series = [
    removeZero("Off-Load", offLoad),
    removeZero("On-Load", onLoad),
    removeZero("Shutdown", shutdown),
  ].filter((x) => x);

  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      // renderTo: "container",
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 50, 0],
      width: 250,
      height: "100%",
    },
    legend: {
      layout: "horizontal",
      align: "center",
      verticalAlign: "bottom",
      // floating: true,
      // x: 0,
      // y: 0,
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: undefined,
      // text: "Duty Cycle",
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
          distance: -35,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: "Hours",
        colorByPoint: true,
        data: series,
      },
    ],
  };
};

const DutyCyclePieChart = (props) => {
  const [chartOptions, setChartOptions] = useState(commonOptions(0, 0, 0));

  React.useEffect(() => {
    const {
      //Duty Cycle
      shutdownHours,
      offLoadHours,
      onLoadHours,
    } = props.data;

    setChartOptions(commonOptions(offLoadHours, onLoadHours, shutdownHours));
  }, [props.data]);

  return (
    <div>
      <PieChart highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default DutyCyclePieChart;
