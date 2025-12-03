import axios from 'axios';

// Configuration
const API_URL = 'http://localhost:3000/api/ingest';
const INTERVAL_MS = 2000; // Send data every 2 seconds

// Zones in the database
const KNOWN_ZONES = [1, 2]; 

/**
 * Generates random sensor data within realistic ranges 
 */
function generateReading(zoneId: number) {
  return {
    zoneId,
    // Random moisture between 30 - 80%
    moisture: parseFloat((30 + Math.random() * 50).toFixed(1)), 
    // Random temp between 20 - 35°C
    temp: parseFloat((20 + Math.random() * 15).toFixed(1)),
    // Random humidity between 40 - 90%
    humidity: parseFloat((40 + Math.random() * 50).toFixed(1)),
  };
}

/**
 * Main Loop
 */
async function startSimulation() {
  console.log(`[Simulator] Starting IoT Sensors Simulation...`);
  console.log(`[Simulator] Target: ${API_URL}`);

  // Infinite loop
  setInterval(async () => {
    try {
      // Pick a random zone
      const randomZone = KNOWN_ZONES[Math.floor(Math.random() * KNOWN_ZONES.length)];
      
      // Generate payload
      const payload = generateReading(randomZone);

      // Send to Server
      const response = await axios.post(API_URL, payload);

      if (response.status === 201) {
        console.log(`[Sent] Zone ${payload.zoneId} | Moisture: ${payload.moisture}% | ID: ${response.data.readingId}`);
      }
    } catch (error: any) {
      if (error.code === 'ECONNREFUSED') {
        console.error('[Error] Server is down. Is localhost:3000 running?');
      } else {
        console.error(`[Error] ${error.message}`);
      }
    }
  }, INTERVAL_MS);
}

startSimulation();