import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/models/user.model'; // Adjust the import path as necessary

@Table({ tableName: 'vehicles' })
export class Vehicle extends Model<Vehicle> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @Column({ type: DataType.STRING(20), unique: true, allowNull: false })
  license_plate: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    validate: {
      isIn: [['car', 'bike', 'truck']],
    },
  })
  type: string;

  @Column({ type: DataType.STRING(50) })
  color: string;
}

