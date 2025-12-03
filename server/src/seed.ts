import { sequelize } from './config/database';
import { Zone } from './models/Zone';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    // Confirm DB connection
    await sequelize.authenticate();
    await sequelize.sync(); 

    // Create a Test Zone
    const [zone, created] = await Zone.findOrCreate({
      where: { id: 1 },
      defaults: {
        name: 'Rice Field 1',
        cropType: 'Rice',
        areaSqMeters: 5000,
        requiredMoisturePercent: 45.0,
      }
    });

    if (created) {
      console.log('Seeded Zone 1: Rice Field 1');
    } else {
      console.log('Zone 1 already exists');
    }

    // Create a second zone
    await Zone.findOrCreate({
      where: { id: 2 },
      defaults: {
        name: 'Yam Field 1',
        cropType: 'Yam',
        areaSqMeters: 3000,
        requiredMoisturePercent: 30.0,
      }
    });
    console.log('Seeded Zone 2: Yam Field 1');

    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();