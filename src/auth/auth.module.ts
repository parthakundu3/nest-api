import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/models/user.model'; // Adjust the import path as necessary
import { FileUploadModule } from '../file-upload/file-upload.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    FileUploadModule,
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
