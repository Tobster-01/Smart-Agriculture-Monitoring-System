import { SensorReading } from '../models/SensorReading';
import { Zone } from '../models/Zone';

interface ReadingPayload {
  zoneId: number;
  moisturePercent: number;
  temperatureCelsius: number;
  humidityPercent: number;
}

export class IngestionService {
  /**
   * Processes a single sensor reading from an IoT device.
   * Validates the zone existence and data integrity before saving.
   */
  async processReading(data: ReadingPayload): Promise<SensorReading> {
    // Confirm input range for moisture percentage
    if (data.moisturePercent < 0 || data.moisturePercent > 100) {
      throw new Error(`Invalid moisture reading: ${data.moisturePercent}%`);
    }

    // Check if zone is valid
    const zone = await Zone.findByPk(data.zoneId);
    if (!zone) {
      throw new Error(`Zone ID ${data.zoneId} not registered in SAMS.`);
    }

    // Save readings
    const reading = await SensorReading.create({
      zoneId: data.zoneId,
      moisturePercent: data.moisturePercent,
      temperatureCelsius: data.temperatureCelsius,
      humidityPercent: data.humidityPercent,
    });
    
    return reading;
  }
}