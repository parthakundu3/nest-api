import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

type BookingCreationAttrs = {
  vehicle_id: number;
  slot_id: number;
  start_time: Date;
  end_time?: Date;
  status?: string;
  fee?: number;
};



@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking)
    private bookingModel: typeof Booking,
  ) {}

 async create(dto: CreateBookingDto): Promise<Booking> {
  return await this.bookingModel.create(dto as any);
}


  findAll() {
    return this.bookingModel.findAll({ include: ['vehicle', 'slot'] });
  }

  findOne(id: number) {
    return this.bookingModel.findByPk(id, { include: ['vehicle', 'slot'] });
  }

  // update(id: number, updateBookingDto: UpdateBookingDto) {
  //   return this.bookingModel.update(updateBookingDto, {
  //     where: { id },
  //   });
  // }

  remove(id: number) {
    return this.bookingModel.destroy({ where: { id } });
  }
}
