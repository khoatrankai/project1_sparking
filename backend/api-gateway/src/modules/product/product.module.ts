import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
// import { CloudinaryMiddleware } from 'src/middlewares/cloudinary.middleware';
// import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
// import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { MulterModule } from '@nestjs/platform-express';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { memoryStorage } from 'multer';

@Module({
  imports: [
    CloudinaryModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ClientsModule.register([
      {
        name: 'PRODUCT',
        transport: Transport.TCP,
        options: {
          host: 'product-service',
          port: 3012,
        },
      },
      {
        name: 'SYSTEM',
        transport: Transport.TCP,
        options: {
          host: 'system-service',
          port: 3004,
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          host: 'user-service',
          port: 3005,
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
  // exports:[TypeOrmModule]
})
export class ProductModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(CloudinaryMiddleware).forRoutes(ProductController);
  // }
}
