import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParkingSlot } from './entities/slot.entity';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [SequelizeModule.forFeature([ParkingSlot]), AuthModule],
  controllers: [SlotsController],
  providers: [SlotsService],
})
export class SlotsModule {}
