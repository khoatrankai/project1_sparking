import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './modules/auth/auth.module';
// import { UserModule } from './modules/user/user.module';
// import { PostsModule } from './modules/post/post.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CustomerModule } from './modules/customer/customer.module';
import { JwtModule } from '@nestjs/jwt';
import { ProposeModule } from './modules/propose/propose.module';
import { PriceQuoteModule } from './modules/price_quote/price_quote.module';
import { SystemModule } from './modules/system/system.module';
import { ProductModule } from './modules/product/product.module';
// import { CloudinaryModule } from './cloudinary/cloudinary.module';
// import { FriendModule } from './modules/friend/friend.module';
// import { PagesModule } from './modules/page/page.module';
// import { GroupsModule } from './modules/group/group.module';
// import { MyGateway } from './configs/socket/socket.module';

@Module({
  imports: [AuthModule,ProposeModule,UserModule,CustomerModule,PriceQuoteModule,SystemModule,ProductModule,
   ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule], 
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
      },
    }),
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
