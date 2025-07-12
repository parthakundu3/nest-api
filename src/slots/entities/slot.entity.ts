import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { IsString, IsIn } from 'class-validator';
@Table({ tableName: 'parking_slots' })
export class ParkingSlot extends Model<ParkingSlot> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING(20), unique: true, allowNull: false })
  slot_number: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    defaultValue: 'available',
    validate: {
      isIn: [['available', 'occupied', 'reserved']],
    },
  })
  status: string;

  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  level: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['car', 'bike', 'truck']],
    },
  })
  type_supported: string;
}




