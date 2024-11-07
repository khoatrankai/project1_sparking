import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable} from '@nestjs/common';
@Injectable()
export class EmailService {
  constructor( private mailerService:MailerService) {
  
  }
  async sendMail(to: string, subject: string, text: string) {
    try{
      await this.mailerService.sendMail({to,subject,text})
      return{
        statusCode:HttpStatus.CREATED,
        message: 'Gửi mail xác thực tạo thành công đến '+to
      }

    }catch{
      throw new BadRequestException
    }
  }
}
