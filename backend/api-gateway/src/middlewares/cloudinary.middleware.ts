// cloudinary.middleware.ts
import {  Injectable, NestMiddleware } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { CloudinaryResponse } from 'src/cloudinary/cloudinary-response';
import * as streamifier from 'streamifier'
import { ConfigService } from '@nestjs/config';
@Injectable()
export class CloudinaryMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService
  ) { 
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }
 
  use(req: Request, res: Response, next: NextFunction): void {

    

    const upload = multer({ storage: multer.memoryStorage() }).array('images');

    upload(req, res, async (err:string) => {
     
     
      if (err) {
        return res.status(400).json({ message: 'File upload failed' });
      }
      try {
  
        if(req.files){
          const data = (await Promise.all((req.files as Express.Multer.File[]).map((file)=> this.uploadFileToCloudinary(file)))).map((dt)=> dt.secure_url);
          req['imageUrls'] = data
          
        }
        next();
       
      } catch (error) {
        return res.status(500).json({ message: 'Upload to Cloudinary failed', error });
      }
    });
  }
  private uploadFileToCloudinary(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
