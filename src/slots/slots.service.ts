import { Injectable } from '@nestjs/common';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { ParkingSlot as Slot } from './entities/slot.entity';

@Injectable()
export class SlotsService {
  
  constructor(
    @InjectModel(Slot)
    private SlotModel: typeof Slot
  ) {}
  async create(dto: CreateSlotDto): Promise<Slot> {
    try {
      //fix thwe following
      const result = await this.SlotModel.create(dto as any);
      console.log('Created:', result.toJSON());
      return result;
    } catch (error) {
      console.error('Insert error:', error);
      throw error;
    }
  }
  async findOne(id: number): Promise<Slot> {
    try {
      const Slot = await this.SlotModel.findByPk(id);
      if (!Slot) {
        throw new Error(`Slot with id ${id} not found`);
      }
      return Slot;
    } catch (error) {
      console.error(`Find error:`, error);
      throw error;
    }
  }

  async findAll() {
    try {
      const Slots = await this.SlotModel.findAll();
      return Slots;
    } catch (error) {
      console.error(`Find error:`, error);
      throw error;
    }
  }

  async update(id: number, updateSlotDto: UpdateSlotDto): Promise<Slot> {
    try {
      const Slot = await this.SlotModel.findByPk(id);
      if (!Slot) {
        throw new Error(`Slot with id ${id} not found`);
      }
      await Slot.update(updateSlotDto as any);
      return Slot;
    } catch (error) {
      console.error(`Update error:`, error);
      throw error;
    }
  }
  
  async remove(id: number): Promise<void> {
    try {
      const deletedCount = await this.SlotModel.destroy({ where: { id } });
      if (deletedCount === 0) {
        throw new Error(`Slot with id ${id} not found or already removed`);
      }
    } catch (error) {
      console.error(`Delete error:`, error);
      throw error;
    }
  }
  
}
