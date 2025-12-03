import { Router } from 'express';
import { IngestionController } from '../controllers/IngestionController';

const router = Router();
const controller = new IngestionController();

// Sensor data ingestion endpoint
router.post('/ingest', (req, res) => controller.receiveReading(req, res));

export default router;