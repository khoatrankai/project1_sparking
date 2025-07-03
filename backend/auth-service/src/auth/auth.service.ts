import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
// import { UserResponse } from 'src/interfaces/user.interface';
// import { firstValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/dto/user-login.dto';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { decryptJson, encryptJson } from 'src/common/utils/crypto-user.util';
import * as speakeasy from 'speakeasy';
import { VerifyUserDto } from 'src/dto/verify-user.dto';
import { CreateUserDto } from 'src/dto/create_user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private readonly usersClient: ClientProxy,
    @Inject('CUSTOMER') private readonly customersClient: ClientProxy,
    @Inject('MAIL') private readonly mailClient: ClientProxy,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  checkIsEmail(data: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(data);
  }

  checkIsPhoneNumber(data: string) {
    const phoneRegex = /^\+?\d{10,15}$/;
    return phoneRegex.test(data);
  }

  async register(otpUserDto: CreateUserDto) {
    const checkUser = await firstValueFrom(
      this.usersClient.send({ cmd: 'login-user' }, otpUserDto.email),
    );
    if (checkUser) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tài khoản đã tồn tại',
      };
    }
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    const otp = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      step: 300,
    });

    if (this.checkIsEmail(otpUserDto.email)) {
      const data = encryptJson(
        { ...otpUserDto },
        this.configService.get<string>('CRYPTO_SECRET'),
      );
      return await firstValueFrom(
        this.mailClient.send(
          { cmd: 'send-email' },
          {
            to: otpUserDto.email,
            subject: 'Tin nhắn xác nhận',
            text: `${this.configService.get<string>('DOMAIN')}/auth/verify?otp=${otp}&data=${data}&secret=${secret}`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; max-width: 600px; margin: auto;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img 
      src="https://sparking.cloud/_next/image?url=%2Flogo.png&w=256&q=75" 
      alt="Your Company Logo" 
      style="max-width: 150px; height: auto;" 
    />
  </div>
  <h2 style="color: #4CAF50; text-align: center;">Xác nhận tài khoản của bạn</h2>
  <p>Chào bạn,</p>
  <p>Vui lòng nhấp vào liên kết dưới đây để xác nhận tài khoản của bạn:</p>
  <div style="text-align: center; margin: 20px 0;">
    <a 
      href="${this.configService.get<string>('DOMAIN')}/auth/verify?otp=${otp}&data=${data}&secret=${secret}" 
      style="display: inline-block; padding: 10px 15px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
      Xác nhận tài khoản
    </a>
  </div>
  <p style="margin-top: 20px;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này.</p>
  <p style="margin-top: 20px; color: #555;">Trân trọng,<br/>Đội ngũ hỗ trợ</p>
</div>
            `,
          },
        ),
      );
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Thông tin tài khoản không phù hợp',
    };
  }

  async verify(verifyUserDto: VerifyUserDto) {
    const verified = speakeasy.totp.verify({
      secret: verifyUserDto.secret,
      encoding: 'base32',
      token: verifyUserDto.otp,
      step: 300,
      window: 1,
    });
    if (verified) {
      const dataEncord = decryptJson(
        verifyUserDto.data,
        this.configService.get<string>('CRYPTO_SECRET'),
      );
      if (Object.keys(dataEncord).length > 0) {
        return this.usersClient.send({ cmd: 'register-user' }, dataEncord);
      }
    } else {
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Hết hạn otp' };
    }
  }

  generateRandomPassword = (length = 12) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  async verifyMail(verifyUserDto: VerifyUserDto) {
    const verified = speakeasy.totp.verify({
      secret: verifyUserDto.secret,
      encoding: 'base32',
      token: verifyUserDto.otp,
      step: 300,
      window: 1,
    });
    if (verified) {
      const dataEncord = decryptJson(
        verifyUserDto.data,
        this.configService.get<string>('CRYPTO_SECRET'),
      );
      const pass = this.generateRandomPassword(10);
      if (Object.keys(dataEncord).length > 0) {
        const res = await firstValueFrom(
          this.usersClient.send(
            { cmd: 'register-user_mail' },
            { ...dataEncord, password: pass },
          ),
        );
        if (res.statusCode === 201) {
          await firstValueFrom(
            this.mailClient.emit(
              { cmd: 'send-email' },
              {
                to: dataEncord['email'],
                subject: 'Chúc mừng bạn đã đươc chấp thuận đơn đăng ký',
                text: `${pass}`,
                html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
             <div style="text-align: center; margin-bottom: 20px;">
        <img 
          src="https://sparking.cloud/_next/image?url=%2Flogo.png&w=256&q=75" 
          alt="Công ty Sparking" 
          style="max-width: 150px; height: auto;" 
        />
      </div>
            <h2 style="color: #4CAF50; text-align: center;" > Gửi bạn mật khẩu tạm thời </h2>
            <p>Chào ${dataEncord['email']},</p>
            <p>Cảm ơn bạn đã đợi trong thời chúng tôi xác thực. Đây là thông tin mật khẩu của bạn:</p>
            <p style="font-size: 18px; font-weight: bold; color: #4CAF50; margin: 10px 0;">activity-ready
               ${pass}
            </p>
            <p>Vui lòng sử dụng mật khẩu này để đăng nhập. Sau khi đăng nhập thành công, bạn cần thay đổi mật khẩu của mình để đảm bảo an toàn.</p>
            <a 
              href="${this.configService.get<string>('DOMAIN_CLIENT')}/login?status=success&email=${dataEncord['email']}&password=${pass}" 
              style="display: inline-block; padding: 10px 15px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
              Đăng nhập
            </a>
            <p style="margin-top: 20px;">Nếu bạn không yêu cầu mật khẩu tạm thời này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
            <p style="margin-top: 20px;">Trân trọng,<br/>Đội ngũ hỗ trợ</p>
          </div>
            `,
              },
            ),
          );
          // response.redirect(
          //   `${this.configService.get<string>('DOMAIN_CLIENT')}/login?status=success`,
          // );
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Tài khoản đã được xác nhận',
          };
        } else {
          // response.redirect(
          //   `${this.configService.get<string>('DOMAIN_CLIENT')}/login?status=fail`,
          // );
          return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Tài khoản xác nhận thất bại',
          };
        }
      }
    } else {
      // response.redirect(
      //   `${this.configService.get<string>('DOMAIN_CLIENT')}/login?status=otp`,
      // );
      return { statusCode: HttpStatus.BAD_REQUEST, message: 'Hết hạn otp' };
    }
  }

  async sendRequestSign(email?: string) {
    const checkUser = await firstValueFrom(
      this.usersClient.send({ cmd: 'login-user' }, email),
    );
    if (checkUser) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tài khoản đã tồn tại',
      };
    }
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    const otp = speakeasy.totp({
      secret: secret,
      encoding: 'base32',
      step: 300,
    });

    if (this.checkIsEmail(email)) {
      const data = encryptJson(
        { email },
        this.configService.get<string>('CRYPTO_SECRET'),
      );
      const res = await firstValueFrom(
        this.mailClient.send(
          { cmd: 'send-email-sign' },
          {
            to: this.configService.get<string>('ADMIN'),
            subject: 'Xác nhận thông tin người đăng ký mới',
            text: `${this.configService.get<string>('DOMAIN')}/auth/verify?otp=${otp}&data=${data}&secret=${secret}`,
            html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; max-width: 600px; margin: auto;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img 
      src="https://sparking.cloud/_next/image?url=%2Flogo.png&w=256&q=75" 
      alt="Your Company Logo" 
      style="max-width: 150px; height: auto;" 
    />
  </div>
  <h2 style="color: #4CAF50; text-align: center;">Xác nhận tài khoản của bạn</h2>
  <p>Sếp ơi,</p>
  <p>Bạn có email ${email} đang muốn đăng ký nhân viên:</p>
  <div style="text-align: center; margin: 20px 0;">
    <a 
      href="${this.configService.get<string>('DOMAIN')}/auth/verify-sign?otp=${otp}&data=${data}&secret=${secret}" 
      style="display: inline-block; padding: 10px 15px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
      Xác nhận tài khoản
    </a>
  </div>
  <p style="margin-top: 20px;">Nếu sếp không đồng ý yêu cầu này, vui lòng bỏ qua email này.</p>
  <p style="margin-top: 20px; color: #555;">Trân trọng,<br/>Đội ngũ hỗ trợ</p>
</div>
            `,
          },
        ),
      );
      if (res.statusCode === 201) {
        await firstValueFrom(
          this.mailClient.emit(
            { cmd: 'send-email' },
            {
              to: email,
              subject: 'Đơn đăng ký đã được gửi tới công ty',
              text: `${this.configService.get<string>('DOMAIN')}/auth/verify?otp=${otp}&data=${data}&secret=${secret}`,
              html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333; border: 1px solid #eaeaea; border-radius: 8px; padding: 20px; max-width: 600px; margin: auto;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img 
        src="https://sparking.cloud/_next/image?url=%2Flogo.png&w=256&q=75" 
        alt="Your Company Logo" 
        style="max-width: 150px; height: auto;" 
      />
    </div>
    <h2 style="color: #4CAF50; text-align: center;">Cảm ơn bạn đã gửi đơn đăng ký</h2>
    <p>Bạn ơi,</p>
    <p>Vui lòng chờ trong giây lát để hệ thống xác nhận cho bạn. </p>
    <p style="margin-top: 20px; color: #555;">Trân trọng,<br/>Đội ngũ hỗ trợ</p>
  </div>
              `,
            },
          ),
        );
      }
      return res;
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Thông tin tài khoản không phù hợp',
    };
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await firstValueFrom(
      this.usersClient.send({ cmd: 'login-user' }, userLoginDto.email),
    );
    if (user && user.status === 'active') {
      const payload = { email: user.email, sub: user.user_id, role: 'admin' };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'],
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'],
      });
      return { accessToken, refreshToken };
    }
    throw new InternalServerErrorException();
  }

  async loginCustomer(userLoginDto: UserLoginDto) {
    const user = await firstValueFrom(
      this.customersClient.send({ cmd: 'login-customer' }, userLoginDto.email),
    );
    if (user && user.status === 'active') {
      const payload = {
        email: user.email,
        sub: user.customer_id,
        role: 'customer',
      };
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'],
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: process.env['JWT_REFRESH_TOKEN_EXPIRES_IN'],
      });
      return { accessToken, refreshToken };
    }
    throw new InternalServerErrorException();
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      });

      const newAccessToken = this.jwtService.sign(
        { ...payload },
        { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] },
      );
      return { newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async comfirmAccessToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: process.env['JWT_ACCESS_TOKEN_SECRET'],
      });

      // const newAccessToken = this.jwtService.sign({ ...payload }, { expiresIn: process.env['JWT_ACCESS_TOKEN_EXPIRES_IN'] });
      return {
        statusCode: HttpStatus.OK,
        data: payload,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
