import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}
  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      await this.mailerService.sendMail({ to, subject, text, html });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Gửi mail xác thực tạo thành công đến ' + to,
      };
    } catch {
      throw new BadRequestException();
    }
  }

  async sendMailSign(to: string, subject: string, text: string, html?: string) {
    try {
      await this.mailerService.sendMail({ to, subject, text, html });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Đã gửi đơn đăng ký đến công ty',
      };
    } catch {
      throw new BadRequestException();
    }
  }
}
