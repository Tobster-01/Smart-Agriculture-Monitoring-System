import axios from 'axios';

// Server URL
const API_URL = 'http://localhost:3000/api';

export interface Zone {
  id: number;
  name: string;
  cropType: string;
  areaSqMeters: number;
  requiredMoisturePercent: number;
}

export interface Reading {
  id: number;
  zoneId: number;
  moisturePercent: number;
  temperatureCelsius: number;
  humidityPercent: number;
  createdAt: string;
}

export const api = {
  /**
   * Fetch all registered zones
   */
  getZones: async (): Promise<Zone[]> => {
    const response = await axios.get(`${API_URL}/zones`);
    return response.data;
  },

  /**
   * Fetch history for a specific zone
   */
  getZoneHistory: async (zoneId: number): Promise<Reading[]> => {
    const response = await axios.get(`${API_URL}/zones/${zoneId}/history`);
    // Reverse to show from oldest to newest readings
    return response.data.reverse(); 
  }
};