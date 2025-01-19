// cloudinary.service.ts

import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';
import { CloudinaryResponse } from './cloudinary-response';
import * as streamifier from 'streamifier';
@Injectable()
export class CloudinaryService {
  private getResourceType(mimetype: string): 'image' | 'video' | 'raw' {
    if (mimetype.startsWith('image')) {
      return 'image';
    } else if (mimetype.startsWith('video')) {
      return 'video';
    } else {
      return 'raw'; // For Word, Excel, PDF, and other files
    }
  }
  async uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return await new Promise<CloudinaryResponse>((resolve, reject) => {
      const resourceType = this.getResourceType(file.mimetype);
      const typeOK = file.originalname.split('.').pop();
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          public_id:
            resourceType === 'raw'
              ? uuidv4() + '.' + typeOK === 'pdf'
                ? 'docx'
                : typeOK
              : undefined,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async uploadFiles(files: Express.Multer.File[]) {
    const data = (
      await Promise.all(
        (files as Express.Multer.File[]).map(
          async (file) => await this.uploadFile(file),
        ),
      )
    ).map((dt) => dt.secure_url);
    return data;
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
