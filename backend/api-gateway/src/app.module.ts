import {  MiddlewareConsumer, Module } from '@nestjs/common';
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
import { CheckTokenMiddleware } from './middlewares/check_token.middleware';
import { ActivityModule } from './modules/activity/activity.module';
import { ProjectModule } from './modules/project/project.module';
import { ContractModule } from './modules/contract/contract.module';
import { OpportunityModule } from './modules/opportunity/opportunity.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AIGeminiModule } from './modules/ai-gemini/ai_gemini.module';
import { SocketModule } from './modules/socket/socket.module';
// import { CloudinaryModule } from './cloudinary/cloudinary.module';
// import { FriendModule } from './modules/friend/friend.module';
// import { PagesModule } from './modules/page/page.module';
// import { GroupsModule } from './modules/group/group.module';
// import { MyGateway } from './configs/socket/socket.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    SocketModule,ActivityModule,ProjectModule,ContractModule,OpportunityModule,AuthModule,AIGeminiModule,ProposeModule,UserModule,CustomerModule,PriceQuoteModule,SystemModule,ProductModule,
   ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  },
),
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply( CheckTokenMiddleware) // Áp dụng middleware
      .forRoutes('*'); // Áp dụng cho tất cả các routes, hoặc bạn có thể chỉ định route cụ thể
  }
}
