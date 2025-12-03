import { Request, Response } from 'express';
import { ZoneService } from '../services/ZoneService';

const zoneService = new ZoneService();

export class ZoneController {

  async getZones(req: Request, res: Response) {
    try {
      const zones = await zoneService.getAllZones();
      res.json(zones);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getZoneHistory(req: Request, res: Response) {
    try {
      const { zoneId } = req.params;
      const readings = await zoneService.getReadingsForZone(Number(zoneId));
      res.json(readings);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}