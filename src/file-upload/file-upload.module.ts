import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          // Add file path to request object for later use
          (req as any).filePath = `uploads/${filename}`;
          cb(null, filename);
        },
      }),
    }),
  ],

  providers: [FileUploadService],
  exports: [FileUploadService], // <-- Add this line
})
export class FileUploadModule {}
