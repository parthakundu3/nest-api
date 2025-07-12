import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Vehicle } from '../../vehicles/entities/vehicle.entity';
import { ParkingSlot } from '../../slots/entities/slot.entity';

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => Vehicle)
  @Column({ type: DataType.INTEGER, allowNull: false })
  vehicle_id: number;

  @ForeignKey(() => ParkingSlot)
  @Column({ type: DataType.INTEGER, allowNull: false })
  slot_id: number;

  @Column({ type: DataType.DATE, allowNull: false })
  start_time: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  end_time?: Date;

  @Column({
    type: DataType.STRING(15),
    defaultValue: 'active',
    validate: {
      isIn: [['active', 'completed', 'cancelled']],
    },
  })
  status: string;

  @Column({ type: DataType.DECIMAL(10, 2) })
  fee: number;

  @BelongsTo(() => Vehicle)
  vehicle: Vehicle;

  @BelongsTo(() => ParkingSlot)
  slot: ParkingSlot;
}

