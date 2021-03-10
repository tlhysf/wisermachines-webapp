// Build the chart
Highcharts.chart('container', {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
  
  
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      floating: true,
      x: 0,
      y: 20
      
  
    },
    credits: {
      enabled: false,
    },
    exporting: {
      enabled: false,
    },
    title: {
      text: 'Duty Cycle'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y} Hrs</b>'
    },
    accessibility: {
      point: {
        valueSuffix: 'Hrs'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b><br>{point.y} Hrs',
          distance: -50,
        },
        showInLegend: true
      }
    },
    series: [{
      name: 'Hours',
      colorByPoint: true,
      data: [{
        name: 'Off-Load',
        y: 61,
  
      }, {
        name: 'On-Load',
        y: 11
      }, {
        name: 'Shutdown',
        y: 10
      }, ]
    }]
  });
  