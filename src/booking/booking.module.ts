import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './entities/booking.entity';
 // If custom
import { BookingsService } from './booking.service';
import { BookingsController } from './booking.controller';

@Module({
  imports: [SequelizeModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingsService], // 👈 Add this
 // 👈 Optional if needed outside
})
export class BookingModule {}
