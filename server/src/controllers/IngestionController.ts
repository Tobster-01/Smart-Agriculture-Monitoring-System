import { Request, Response } from 'express';
import { IngestionService } from '../services/IngestionService';

const ingestionService = new IngestionService();

export class IngestionController {
  
  /**
   * Receive JSON payload from sensors
   */
  async receiveReading(req: Request, res: Response): Promise<void> {
    try {
      const { zoneId, moisture, temp, humidity } = req.body;

      // Checks required fields
      if (zoneId === undefined || moisture === undefined) {
        res.status(400).json({ error: 'Missing required fields: zoneId, moisture' });
        return;
      }

      const result = await ingestionService.processReading({
        zoneId: Number(zoneId),
        moisturePercent: Number(moisture),
        temperatureCelsius: Number(temp) || 0,
        humidityPercent: Number(humidity) || 0,
      });

      res.status(201).json({ 
        success: true, 
        readingId: result.id,
        timestamp: result.createdAt 
      });

    } catch (error: any) {
      console.error('[Ingestion Error]:', error.message);
      
      // Error handling
      if (error.message.includes('Invalid') || error.message.includes('not registered')) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}