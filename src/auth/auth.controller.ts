import { Controller, Post, Body, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from '../file-upload/file-upload.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) { }

  @Post('register')
  @UseInterceptors(FileInterceptor('file')) // Use global Multer config from FileUploadModule
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { email: string; password: string; fullname: string }
  ) {
    let fileUrl: string | undefined;
    if (file) {
      const uploadResult = await this.fileUploadService.handleFileUpload(file);
      fileUrl = uploadResult.filePath;
    }
    const user = await this.authService.register(body.email, body.password, body.fullname, fileUrl);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User registered successfully',
      data: { id: user.id, email: user.email, fullname: user.fullname, profileurl: user.profileurl }
    };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: result
    };
  }
}

