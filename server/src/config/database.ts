import { Sequelize } from 'sequelize-typescript';
import { Zone } from '../models/Zone';
import { SensorReading } from '../models/SensorReading';
import { WateringEvent } from '../models/WateringEvent';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5434,
  username: process.env.DB_USER || 'sams_user',
  password: process.env.DB_PASS || 'sams_password',
  database: process.env.DB_NAME || 'sams_db',
  logging: false, 
  models: [Zone, SensorReading, WateringEvent], 
});