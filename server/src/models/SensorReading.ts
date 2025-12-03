import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Zone } from './Zone';

@Table({
  tableName: 'sensor_readings',
  timestamps: true, 
})
export class SensorReading extends Model {
  @ForeignKey(() => Zone)
  @Column
  zoneId!: number;

  @BelongsTo(() => Zone)
  zone!: Zone;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  moisturePercent!: number;

  @Column({
    type: DataType.FLOAT,
  })
  temperatureCelsius!: number;

  @Column({
    type: DataType.FLOAT,
  })
  humidityPercent!: number;
}