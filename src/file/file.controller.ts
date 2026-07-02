import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { memoryStorage } from 'multer';
import { Public } from '../auth/public.decorator';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Controller('file')
export class FileController {
  @Public()
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('fileImg', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['.jpg', '.jpeg', '.png', '.webp'];
        const ext = extname(file.originalname).toLowerCase();
        if (!allowedTypes.includes(ext)) {
          return callback(new BadRequestException('File type not allowed'), false);
        }
        callback(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'food-review' },
        (error, result) => {
          if (error) return reject(new BadRequestException(error.message));
          resolve({
            fileName: result.public_id,
            url: result.secure_url,
          });
        },
      ).end(file.buffer);
    });
  }
}