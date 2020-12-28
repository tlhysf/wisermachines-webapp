// Highcharts.chart("container", {
//   chart: {
//     type: "solidgauge",
//     height: "100%",
//   },

//   title: {
//     text: null,
//   },

//   tooltip: {
//     enabled: false,
//   },
//   credits: {
//     enabled: false,
//   },
//   exporting: {
//     enabled: false,
//   },

//   pane: {
//     startAngle: 0,
//     endAngle: 360,
//     background: [
//       {
//         // Track for Move
//         outerRadius: 96,
//         innerRadius: 79,
//         backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
//           .setOpacity(0.3)
//           .get(),
//         borderWidth: 0,
//       },
//       {
//         // Track for Exercise
//         outerRadius: 77,
//         innerRadius: 60,
//         backgroundColor: Highcharts.color(Highcharts.getOptions().colors[1])
//           .setOpacity(0.3)
//           .get(),
//         borderWidth: 0,
//       },
//     ],
//   },

//   yAxis: [
//     {
//       min: 0,
//       max: 100,
//       lineWidth: 0,
//       tickPositions: [],
//       title: {
//         y: 55,
//         text: "Exercise",
//       },
//     },
//     {
//       min: 0,
//       //max: 100,
//       lineWidth: 0,
//       tickPositions: [],
//       title: {
//         y: 100,
//         text: "Move",
//       },
//     },
//   ],

//   plotOptions: {
//     solidgauge: {
//       linecap: "round",
//       rounded: true,
//     },
//   },

//   series: [
//     {
//       name: "Move",
//       data: [
//         {
//           color: Highcharts.getOptions().colors[0],
//           radius: 60,
//           innerRadius: 50,
//           y: 80,
//         },
//       ],
//       dataLabels: {
//         enabled: true,
//         y: 20,
//         borderWidth: 0,
//         backgroundColor: "none",
//         color: Highcharts.getOptions().colors[0],
//         shadow: false,
//         style: {
//           //  font
//           textOutline: "none",
//         },
//       },
//     },
//     {
//       name: "Exercise",
//       data: [
//         {
//           color: Highcharts.getOptions().colors[1],
//           radius: 48,
//           innerRadius: 38,
//           y: 65,
//         },
//       ],
//       dataLabels: {
//         enabled: true,
//         y: -25,
//         borderWidth: 0,
//         backgroundColor: "none",
//         color: Highcharts.getOptions().colors[1],
//         shadow: false,
//         style: {
//           //  font
//           textOutline: "none",
//         },
//       },
//     },
//   ],
// });
