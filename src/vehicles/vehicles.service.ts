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
  async create(dto: CreateVehicleDto, userId: any): Promise<Vehicle> {
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
  async findOne(id: number): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new Error(`Vehicle with id ${id} not found`);
      }
      return vehicle;
    } catch (error) {
      console.error(`Find error:`, error);
      throw error;
    }
  }

  async findAll() {
    try {
      const vehicles = await this.vehicleModel.findAll();
      return vehicles;
    } catch (error) {
      console.error(`Find error:`, error);
      throw error;
    }
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    try {
      const vehicle = await this.vehicleModel.findByPk(id);
      if (!vehicle) {
        throw new Error(`Vehicle with id ${id} not found`);
      }
      await vehicle.update(updateVehicleDto as any);
      return vehicle;
    } catch (error) {
      console.error(`Update error:`, error);
      throw error;
    }
  }
  
  async remove(id: number): Promise<void> {
    try {
      const deletedCount = await this.vehicleModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new Error(`Vehicle with id ${id} not found or already removed`);
      }
    } catch (error) {
      console.error(`Delete error:`, error);
      throw error;
    }
  }
  
}
