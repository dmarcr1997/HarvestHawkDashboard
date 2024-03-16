# HarvestHawkDashboard

## Overview

Harvest Hawk is an environmental monitoring application designed to provide real-time insights into atmospheric conditionss. Leveraging Highcharts for visualization, it displays dynamic charts for temperature, humidity, pressure, and light intensity. The application is designed to fetch data from an ESP32 device, allowing users to monitor environmental conditions accurately.

## Features

- Real-time data visualization
- Temperature, humidity, pressure, and light intensity monitoring
- Highcharts integration for dynamic and responsive charts
- Data fetching from an ESP32 device over a network

## Requirements

- A web server to host the HTML and JavaScript files
- An ESP32 device setup to serve temperature, humidity, pressure, and light data over the network
- Highcharts library (included via CDN in the HTML)

## Installation

1. Ensure your ESP32 device is correctly setup and connected to your local network. Note the device's IP address.
2. Clone or download the Harvest Hawk application files to your local machine.
3. Update the `ESP_HOST` variable in `script.js` with your ESP32 device's IP address.
4. Host the application files (`index.html`, `styles.css`, `script.js`) on your web server.
5. Access the application through your web server's address to start monitoring the environmental conditions.

## Usage

- The application automatically updates the charts and indicators every 6 seconds with the latest data fetched from the ESP32 device.
- Each chart displays the latest value for temperature (in Celsius), humidity (in %), pressure (in hPa), and light intensity (in Lux) with historical data points.
- The indicators at the top of the page provide a quick summary of the current temperature, humidity, and pressure, including a qualitative assessment of the pressure condition (Low, Medium, High).

## Customization

- To adjust the frequency of data updates, change the interval in the `setInterval(fetchDataAndupdateCharts, 6000);` line in `script.js`. The default is set to 6000 milliseconds (6 seconds).
- Customize the appearance of the charts by modifying the Highcharts options in `script.js`.
- Adjust the mock data generation parameters in `generateMockData` function to simulate different ranges of data.
