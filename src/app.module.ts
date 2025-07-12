import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/models/user.model'; // Adjust the import path if needed
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module'; // Make sure to run: npm install @nestjs/config
import { FileUploadModule } from './file-upload/file-upload.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { Vehicle } from './vehicles/entities/vehicle.entity';
import { BookingModule } from './booking/booking.module';
import { SlotsModule } from './slots/slots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [User, Vehicle],
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    FileUploadModule,
    VehiclesModule,
    BookingModule,
    SlotsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
