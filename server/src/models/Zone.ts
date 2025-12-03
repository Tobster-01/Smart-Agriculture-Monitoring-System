import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { SensorReading } from './SensorReading';
import { WateringEvent } from './WateringEvent';

@Table({
  tableName: 'zones',
  timestamps: true,
})
export class Zone extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  cropType!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  areaSqMeters!: number;

  @Column({
    type: DataType.FLOAT,
    comment: 'Minimum moisture % before watering triggers',
  })
  requiredMoisturePercent!: number;

  @HasMany(() => SensorReading)
  readings!: SensorReading[];

  @HasMany(() => WateringEvent)
  wateringEvents!: WateringEvent[];
}