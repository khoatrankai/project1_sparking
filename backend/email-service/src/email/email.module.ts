import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    MailerModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async() =>({
        transport:{
          host:'smtp.gmail.com',
          secure: false,
          auth:{
            user: 'nguyenhiepninh15102003@gmail.com',
            pass:'qorurwrvszdokbvd'
          }
        }
      })
    })
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
