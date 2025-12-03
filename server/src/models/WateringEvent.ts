import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Zone } from './Zone';

@Table({
  tableName: 'watering_events',
  timestamps: true,
})
export class WateringEvent extends Model {
  @ForeignKey(() => Zone)
  @Column
  zoneId!: number;

  @BelongsTo(() => Zone)
  zone!: Zone;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startTime!: Date;

  @Column({
    type: DataType.INTEGER,
    comment: 'Duration in seconds',
  })
  durationSeconds!: number;

  @Column({
    type: DataType.ENUM('SCHEDULED', 'COMPLETED', 'FAILED'),
    defaultValue: 'SCHEDULED',
  })
  status!: string;
}