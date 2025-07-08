import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle)
    private vehicleModel: typeof Vehicle
  ) {}
  async create(dto: CreateVehicleDto): Promise<Vehicle> {
    try {
      //fix thwe following
      const result = await this.vehicleModel.create(dto as any);
      console.log('Created:', result.toJSON());
      return result;
    } catch (error) {
      console.error('Insert error:', error);
      throw error;
    }
  }

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicle`;
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return `This action updates a #${id} vehicle`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicle`;
  }
}
