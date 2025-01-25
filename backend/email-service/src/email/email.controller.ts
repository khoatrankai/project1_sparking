import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { MessagePattern } from '@nestjs/microservices';
import { SendMailDto } from 'src/dto/info-mail.dto';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern({ cmd: 'send-email' })
  sendMail(sendMail: SendMailDto) {
    return this.emailService.sendMail(
      sendMail.to,
      sendMail.subject,
      sendMail.text,
      sendMail.html,
    );
  }

  @MessagePattern({ cmd: 'send-email-sign' })
  sendMailSign(sendMail: SendMailDto) {
    return this.emailService.sendMailSign(
      sendMail.to,
      sendMail.subject,
      sendMail.text,
      sendMail.html,
    );
  }
}
