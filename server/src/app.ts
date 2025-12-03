import 'reflect-metadata'; 
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/database'; 
import ingestionRoutes from './routes/ingestion.routes';
import zoneRoutes from './routes/zone.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Database Sync
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('[Database] Connection established successfully.');
    
    // Create tables if they don't exist
    await sequelize.sync({ alter: true }); 
    console.log('[Database] Models synchronized.');

    // Register routes
    app.use('/api', ingestionRoutes);
    app.use('/api', zoneRoutes);

    app.listen(PORT, () => {
      console.log(`[SAMS Server]: Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[Database] Unable to connect:', error);
  }
};

startServer();

// Routes
app.get('/', (req: Request, res: Response) => {
    res.json({ project: 'sams', status: 'Active' });
});