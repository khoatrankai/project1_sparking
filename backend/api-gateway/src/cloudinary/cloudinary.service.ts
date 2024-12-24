// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier'
@Injectable()
export class CloudinaryService {
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return await new Promise<CloudinaryResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
  
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const data = (await Promise.all((files as Express.Multer.File[]).map((file)=> this.uploadFile(file)))).map((dt)=> dt.secure_url);
    return data
  }
  async deleteFile(publicId: string): Promise<{ result: string }> {
    return await new Promise<{ result: string }>((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
