# Harvest Hawk

Harvest Hawk is an innovative Electron application designed to monitor environmental conditions in real-time. By connecting to an ESP32 device, it fetches and displays data for temperature, humidity, pressure, and light intensity. Utilizing Highcharts for vivid, dynamic charting, Harvest Hawk offers a sleek interface for data visualization, making it an essential tool for environmental monitoring, smart agriculture, or any scenario where real-time data is crucial.

## Features

- **Live Data Visualization**: Displays real-time temperature, humidity, pressure, and light intensity with Highcharts.
- **ESP32 Integration**: Seamlessly fetches data from an ESP32 device over your local network.
- **Dynamic Updates**: Charts and indicators update every 3 seconds, providing a continuous stream of data.
- **Cross-Platform Compatibility**: Built with Electron, Harvest Hawk runs on Windows, macOS, and Linux.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system
- An ESP32 device configured to serve environmental data at `/temp`, `/humidity`, `/pressure`, and `/light` endpoints
- Or the mock-esp running on port 80

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/dmarcr1997/HarvestHawkDashboard.git
   cd HarvestHawkDashboard/desktop-app
   ```
2. Install the necessary dependencies:
   
   ```
   npm i
   ```
3. Run the application:

   ```
   npm run start
   ```
The application should now launch, displaying live data fetched from your configured ESP32 device.
The ESP_HOST url currently points to the mock-esp port. To connect this to your ESP put the IP address of your ESP

### Acknowledgments

Highcharts for their powerful charting library
Electron for making cross-platform desktop applications accessible
The ESP32 community for their invaluable resources and support
