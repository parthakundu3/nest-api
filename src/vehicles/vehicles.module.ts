import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';

@Module({
  imports: [SequelizeModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
