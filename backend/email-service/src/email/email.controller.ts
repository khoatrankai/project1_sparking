import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern } from '@nestjs/microservices';
import { SendMailDto } from 'src/dto/info-mail.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

 @MessagePattern({cmd:'send-email'})
  sendMail(sendMail:SendMailDto){
    console.log("co nhan")
    return this.emailService.sendMail(sendMail.to,sendMail.subject,sendMail.text)
  }
 
  
}
