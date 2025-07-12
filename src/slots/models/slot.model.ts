import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/models/user.model';

@Table({
  tableName: 'Slots',
  timestamps: false,
})
export class Slot extends Model<Slot> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    unique: true,
  })
  declare license_plate: string;

  @Column({
    type: DataType.ENUM('car', 'bike', 'truck'),
    allowNull: false,
  })
  declare type: 'car' | 'bike' | 'truck';

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  declare color: string | null;
}
