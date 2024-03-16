# Mock ESP Server

## Overview

The Mock ESP Server is a simple Express.js application designed to simulate an ESP32 device's environmental data output. It serves randomized data for temperature, pressure, humidity, and light intensity over HTTP endpoints. This server is particularly useful for development and testing purposes when physical hardware is not available or in a simulation environment.

## Features

- Simulates environmental data (temperature, pressure, humidity, light intensity)
- CORS enabled for cross-origin requests
- Easy to integrate with front-end applications for testing

## Requirements

- Node.js installed on your machine
- npm (Node Package Manager)

## Installation

1. Clone or download the Mock ESP Server repository to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install the required dependencies.

## Usage

To start the server, run the following command in the root directory of the project:

```bash
npm start
```
This command uses nodemon for hot reloading. It watches for file changes in your project and automatically restarts the server, facilitating a smoother development experience.

## Accessing the Data
Once the server is running, you can access the randomized environmental data through the following HTTP endpoints:

- Temperature: http://localhost:80/temp
- Pressure: http://localhost:80/pressure
- Humidity: http://localhost:80/humidity
- Light: http://localhost:80/light

Each endpoint returns a JSON object with the respective data. For example:
```json
{
  "temperature": 24.5
}
```
