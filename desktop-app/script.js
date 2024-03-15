const ESP_HOST = 'http://localhost:80'; //ESP IP ADDRESS

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
    data: [] 
  }],
  plotOptions: {
    line: {
      animation: true,
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
    data: [] 
  }],
  plotOptions: {
    line: {
      animation: true,
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
    data: [] 
  }],
  plotOptions: {
    line: {
      animation: true,
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
    data: [] 
  }],
  plotOptions: {
    line: {
      animation: true,
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
  const latestTempFahrenheit = chartT.series[0].data[chartT.series[0].data.length - 1].y;
  document.getElementById('temperature-indicator').innerText = `Temperature: ${latestTempFahrenheit.toFixed(2)}°F`;

  const latestHumidity = chartH.series[0].data[chartH.series[0].data.length - 1].y;
  document.getElementById('humidity-indicator').innerText = `Humidity: ${latestHumidity.toFixed(2)}%`;

  const latestPressure = chartP.series[0].data[chartP.series[0].data.length - 1].y;
  let pressureCategory = 'Medium';
  if (latestPressure < 980) pressureCategory = 'Low';
  else if (latestPressure > 1020) pressureCategory = 'High';
  document.getElementById('pressure-indicator').innerText = `Pressure: ${latestPressure.toFixed(2)} hPa (${pressureCategory})`;

   const latestLightIntensity = chartL.series[0].data[chartL.series[0].data.length - 1].y;
  document.getElementById('light-indicator').innerText = `Light Intensity: ${latestLightIntensity.toFixed(2)} Lux`;
};

const fetchDataAndupdateCharts = () => {
  const now = (new Date()).getTime();

  //Fetch chart data from ESP32
   // Fetch temperature data
  fetch(`${ESP_HOST}/temp`)
    .then(response => response.json())
    .then(data => {
      chartT.series[0].addPoint([now, data.temperature], true, chartT.series[0].data.length > 5, true);
    });

  // Fetch humidity data
  fetch(`${ESP_HOST}/humidity`)
    .then(response => response.json())
    .then(data => {
      chartH.series[0].addPoint([now, data.humidity], true, chartH.series[0].data.length > 5, true);
    });

  // Fetch pressure data
  fetch(`${ESP_HOST}/pressure`)
    .then(response => response.json())
    .then(data => {
      chartP.series[0].addPoint([now, data.pressure], true, chartP.series[0].data.length > 5, true);
    });

  // Fetch light data
  fetch(`${ESP_HOST}/light`)
    .then(response => response.json())
    .then(data => {
      chartL.series[0].addPoint([now, data.light], true, chartL.series[0].data.length > 5, true);
    });

    updateIndicators();
};

// Initialize the charts and start updating them every 3 seconds
setInterval(fetchDataAndupdateCharts, 3000); // Update every 3 seconds

