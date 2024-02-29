const generateMockData = (min, max) => Math.random() * (max - min) + min;

const chartT = new Highcharts.Chart({
  chart: { 
    renderTo: 'chart-temperature',
    backgroundColor: 'black'
},
  title: { 
    text: 'AM2330 Temperature',
    style: {
      color: '#FFFFFF' 
    }
},
  series: [{
    showInLegend: false,
    data: [generateMockData(20, 30)] 
  }],
  plotOptions: {
    line: {
      animation: false,
      dataLabels: { enabled: true },
      marker: { enabled: true }
    },
    series: { color: '#059e8a' }
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' },
    events: {
      setExtremes: function(e) {
        this.chart.series.forEach((series) => {
          series.update({
            dataLabels: {
              enabled: e.min !== undefined
            }
          }, false);
        });
        this.chart.redraw();
      }
    }
  },
  yAxis: {
    title: { text: 'Temperature (Celsius)' }
  },
  credits: { enabled: false }
});

const chartH = new Highcharts.Chart({
  chart: { 
    renderTo: 'chart-humidity',
    backgroundColor: 'black'
},
  title: { 
    text: 'AM2320 Humidity',
    style: {
      color: '#FFFFFF' 
    }
},
  series: [{
    showInLegend: false,
    data: [generateMockData(40, 60)] 
  }],
  plotOptions: {
    line: {
      animation: false,
      dataLabels: { enabled: true },
      marker: { enabled: true }
    }
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' },
    events: {
      setExtremes: function(e) {
        this.chart.series.forEach((series) => {
          series.update({
            dataLabels: {
              enabled: e.min !== undefined 
            }
          }, false);
        });
        this.chart.redraw();
      }
    }
  },
  yAxis: {
    title: { text: 'Humidity (%)' }
  },
  credits: { enabled: false }
});

const chartP = new Highcharts.Chart({
  chart: { 
    renderTo: 'chart-pressure',
    backgroundColor: 'black'
},
  title: { 
    text: 'BMP390 Pressure',
    style: {
      color: '#FFFFFF' 
    }
},
  series: [{
    showInLegend: false,
    data: [generateMockData(950, 1050)] 
  }],
  plotOptions: {
    line: {
      animation: false,
      dataLabels: { enabled: true },
      marker: { enabled: true }
    },
    series: { color: '#18009c' }
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' },
    events: {
      setExtremes: function(e) {
        this.chart.series.forEach((series) => {
          series.update({
            dataLabels: {
              enabled: e.min !== undefined
            }
          }, false);
        });
        this.chart.redraw();
      }
    }
  },
  yAxis: {
    title: { text: 'Pressure (hPa)' }
  },
  credits: { enabled: false }
});

const chartL = new Highcharts.Chart({
  chart: { 
    renderTo: 'chart-light',
    backgroundColor: 'black'
},
  title: { 
    text: 'VEML7700 Light Intensity',
    style: {
      color: '#FFFFFF' 
    }
},
  series: [{
    showInLegend: false,
    data: [generateMockData(0, 2000)] 
  }],
  plotOptions: {
    line: {
      animation: false,
      dataLabels: { enabled: true },
      marker: { enabled: true }
    },
    series: { color: '#e2ba13' }
  },
  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: { second: '%H:%M:%S' },
    events: {
      setExtremes: function(e) {
        this.chart.series.forEach((series) => {
          series.update({
            dataLabels: {
              enabled: e.min !== undefined 
            }
          }, false);
        });
        this.chart.redraw();
      }
    }
  },
  yAxis: {
    title: { text: 'Light Intensity (Lux)' }
  },
  credits: { enabled: false }
});

// Function to update charts with new mock data
const updateCharts = () => {
  const now = (new Date()).getTime();

  // Add a new point to each chart
    if(chartT.series[0].data.length > 5) {
        chartT.series[0].addPoint([now, generateMockData(20, 30)], true, true, true);
    } else {
        chartT.series[0].addPoint([now, generateMockData(20, 30)], true, false, true);
    }
    if(chartH.series[0].data.length > 5) {
        chartH.series[0].addPoint([now, generateMockData(40, 60)], true, true, true);
    } else {
        chartH.series[0].addPoint([now, generateMockData(40, 60)], true, false, true);
    }
    if(chartP.series[0].data.length > 5) {
        chartP.series[0].addPoint([now, generateMockData(950, 1050)], true, true, true);
    } else {
        chartP.series[0].addPoint([now, generateMockData(950, 1050)], true, false, true);
    }
    if( chartL.series[0].data.length > 5) {
         chartL.series[0].addPoint([now, generateMockData(0, 2000)], true, true, true);
    } else {
         chartL.series[0].addPoint([now, generateMockData(0, 2000)], true, false, true);
    }
};

// Initialize the charts and start updating them every 3 seconds
setInterval(updateCharts, 3000); // Update every 3 seconds

