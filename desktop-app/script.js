const ESP_HOST = 'http://localhost:80'; //ESP IP ADDRESS

const temperatureChart = createD3Chart('chart-temperature', '#f00', 'Temperature');
const humidityChart = createD3Chart('chart-humidity', '#00f', 'Humidity');
const pressureChart = createD3Chart('chart-pressure', '#0f0', 'Pressure');
const lightChart = createD3Chart('chart-light', '#ff0', 'Light Intensity');

let latestTemperature = null;
let latestHumidity = null;
let latestPressure = null;
let latestLight = null;

let temperatureData = [];
let humidityData = [];
let pressureData = [];
let lightData = [];

function createD3Chart(containerId, color, title) {
  const margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = 480 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

  const svg = d3.select(`#${containerId}`)
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Define the scales and axes
  const xScale = d3.scaleTime().range([0, width]);
  const yScale = d3.scaleLinear().range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .attr("class", "x-axis");

  svg.append("g")
    .attr("class", "y-axis");

  // Create the line generator
  const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  // Append the path for the line, but without specifying the d attribute yet
  svg.append("path")
    .attr("class", "data-line")
    .style("fill", "none")
    .style("stroke", color)
    .style("stroke-width", 2);

  return {
    update: function(data) {
      // Update scales
      xScale.domain(d3.extent(data, d => d.x));
      yScale.domain([0, d3.max(data, d => d.y)]);

      // Update axes
      svg.select(".x-axis").call(d3.axisBottom(xScale));
      svg.select(".y-axis").call(d3.axisLeft(yScale));

      // Update line
      svg.select(".data-line")
        .datum(data)
        .attr("d", line);
    }
  };
}

const updateIndicators = () => {
  if (latestTemperature !== null) {
    document.getElementById('temperature-indicator').innerText = `Temperature: ${latestTemperature.toFixed(2)}°F`;
  }
  
  if (latestHumidity !== null) {
    document.getElementById('humidity-indicator').innerText = `Humidity: ${latestHumidity.toFixed(2)}%`;
  }

  let pressureCategory = 'Medium';
  if (latestPressure < 980) pressureCategory = 'Low';
  else if (latestPressure > 1020) pressureCategory = 'High';
  
  if (latestPressure !== null) {
    document.getElementById('pressure-indicator').innerText = `Pressure: ${latestPressure.toFixed(2)} hPa (${pressureCategory})`;
  }

  if (latestLight !== null) {
    document.getElementById('light-indicator').innerText = `Light Intensity: ${latestLight.toFixed(2)} Lux`;
  }
};

const fetchDataAndUpdateCharts = () => {
  const now = new Date();

  fetch(`${ESP_HOST}/temp`)
    .then(response => response.json())
    .then(data => {
      latestTemperature = data.temperature;
      temperatureData.push({ x: now, y: data.temperature });
      temperatureChart.update(temperatureData); 
    });

  fetch(`${ESP_HOST}/humidity`)
    .then(response => response.json())
    .then(data => {
      latestHumidity = data.humidity;
      humidityData.push({ x: now, y: data.humidity });
      humidityChart.update(humidityData);
    });

  fetch(`${ESP_HOST}/pressure`)
    .then(response => response.json())
    .then(data => {
      latestPressure = data.pressure;
      pressureData.push({ x: now, y: data.pressure });
      pressureChart.update(pressureData);
    });

  fetch(`${ESP_HOST}/light`)
    .then(response => response.json())
    .then(data => {
      latestLight = data.light;
      lightData.push({ x: now, y: data.light });
      lightChart.update(lightData);
    });

  updateIndicators();
};

const limitDataLength = (data, maxLength = 10) => {
  while (data.length > maxLength) {
    data.shift();
  }
};

setInterval(fetchDataAndUpdateCharts, 100);
