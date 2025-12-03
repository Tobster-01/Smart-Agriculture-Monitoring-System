import { Router } from 'express';
import { ZoneController } from '../controllers/ZoneController';

const router = Router();
const controller = new ZoneController();

// List all zones endpoint
router.get('/zones', (req, res) => controller.getZones(req, res));

// Get zone history endpoint
router.get('/zones/:zoneId/history', (req, res) => controller.getZoneHistory(req, res));

export default router;