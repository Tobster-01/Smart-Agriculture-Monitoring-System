import { Zone } from '../models/Zone';
import { SensorReading } from '../models/SensorReading';

export class ZoneService {
  
  /**
   * Returns all zones 
   */
  async getAllZones(): Promise<Zone[]> {
    return await Zone.findAll({
      order: [['id', 'ASC']]
    });
  }

  /**
   * Returns the latest 50 readings for a zone
   */
  async getReadingsForZone(zoneId: number): Promise<SensorReading[]> {
    return await SensorReading.findAll({
      where: { zoneId },
      order: [['createdAt', 'DESC']], // Newest first
      limit: 50,                      // Only get the last 50 readings
    });
  }
}