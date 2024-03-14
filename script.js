const ESP_HOST = 'http://localhost:80';

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
const updateIndicators = () => {
  const latestTempCelsius = chartT.series[0].data[chartT.series[0].data.length - 1].y;
  const latestTempFahrenheit = (latestTempCelsius * 9/5) + 32;
  document.getElementById('temperature-indicator').innerText = `Temperature: ${latestTempFahrenheit.toFixed(2)}°F`;

  const latestHumidity = chartH.series[0].data[chartH.series[0].data.length - 1].y;
  document.getElementById('humidity-indicator').innerText = `Humidity: ${latestHumidity.toFixed(2)}%`;

  const latestPressure = chartP.series[0].data[chartP.series[0].data.length - 1].y;
  let pressureCategory = 'Medium';
  if (latestPressure < 980) pressureCategory = 'Low';
  else if (latestPressure > 1020) pressureCategory = 'High';
  document.getElementById('pressure-indicator').innerText = `Pressure: ${latestPressure.toFixed(2)} hPa (${pressureCategory})`;
};

// Function to update charts with new mock data
const fetchDataAndupdateCharts = () => {
  const now = (new Date()).getTime();

  //Fetch chart data from ESP32
   // Fetch temperature data
  fetch(`${ESP_HOST}/temp`)
    .then(response => response.json())
    .then(data => {
      chartT.series[0].addPoint([now, data.value], true, chartT.series[0].data.length > 5, true);
    });

  // Fetch humidity data
  fetch(`${ESP_HOST}/humid`)
    .then(response => response.json())
    .then(data => {
      chartH.series[0].addPoint([now, data.value], true, chartH.series[0].data.length > 5, true);
    });

  // Fetch pressure data
  fetch(`${ESP_HOST}/pressure`)
    .then(response => response.json())
    .then(data => {
      chartP.series[0].addPoint([now, data.value], true, chartP.series[0].data.length > 5, true);
    });

  // Fetch light data
  fetch(`${ESP_HOST}/light`)
    .then(response => response.json())
    .then(data => {
      chartL.series[0].addPoint([now, data.value], true, chartL.series[0].data.length > 5, true);
    });

  //Mock chart data
  // // Add a new point to each chart
  // if(chartT.series[0].data.length > 5) {
  //     chartT.series[0].addPoint([now, generateMockData(20, 30)], true, true, true);
  // } else {
  //     chartT.series[0].addPoint([now, generateMockData(20, 30)], true, false, true);
  // }
  // if(chartH.series[0].data.length > 5) {
  //     chartH.series[0].addPoint([now, generateMockData(40, 60)], true, true, true);
  // } else {
  //     chartH.series[0].addPoint([now, generateMockData(40, 60)], true, false, true);
  // }
  // if(chartP.series[0].data.length > 5) {
  //     chartP.series[0].addPoint([now, generateMockData(950, 1050)], true, true, true);
  // } else {
  //     chartP.series[0].addPoint([now, generateMockData(950, 1050)], true, false, true);
  // }
  // if( chartL.series[0].data.length > 5) {
  //       chartL.series[0].addPoint([now, generateMockData(0, 2000)], true, true, true);
  // } else {
  //       chartL.series[0].addPoint([now, generateMockData(0, 2000)], true, false, true);
  // }
  updateIndicators();
};

// Initialize the charts and start updating them every 3 seconds
setInterval(fetchDataAndupdateCharts, 3000); // Update every 3 seconds

