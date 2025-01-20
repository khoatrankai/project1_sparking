import {
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { In, Not, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from 'src/dto/create_user.dto';
import { ResultResponse } from 'src/common/interfaces/result.interface';
import { UpdateUserDto } from 'src/dto/update_user.dto';
import { GroupUser } from 'src/database/entities/group_user.entity';
import { CreateGroupUserDto } from 'src/dto/GroupUser/create_group.dto';
import { UpdateGroupUserDto } from 'src/dto/GroupUser/update_group.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(AccountUsers)
    private readonly accountUserRepository: Repository<AccountUsers>,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
    private configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(
      password,
      Number(this.configService.get<string>('SALT')),
    );
    return hashedPassword;
  }

  private extractDuplicateField(errorMessage: string): string {
    const match = errorMessage.match(/for key '([^']+)'/);
    const allConfig = {
      email: this.configService.get<string>('IDX_USERS_EMAIL'),
      phone: this.configService.get<string>('IDX_USERS_PHONE'),
    };
    return match
      ? allConfig.email === match[1].replace('users.', '')
        ? 'email'
        : 'phone'
      : 'dữ liệu';
  }

  async createUser(registerDto: CreateUserDto): Promise<ResultResponse> {
    try {
      const id = uuidv4();
      const group_user = registerDto.group_user
        ? await this.groupUserRepository.findOne({
            where: { group_id: registerDto.group_user },
          })
        : undefined;
      const pass = await this.hashPassword(registerDto.password);
      const user = this.accountUserRepository.create({
        ...registerDto,
        user_id: id,
        password: pass,
        group_user,
      });
      await this.accountUserRepository.save(user);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo tài khoản thành công',
      };
    } catch (err) {
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`);
      }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async deleteUser(datas: string[]) {
    try {
      const rm = await this.accountUserRepository.delete({
        user_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateUser(
    user_id: string,
    updateDto: UpdateUserDto,
  ): Promise<ResultResponse> {
    try {
      if (updateDto.password) {
        const pass = await this.hashPassword(updateDto.password);
        await this.accountUserRepository.update(user_id, {
          ...updateDto,
          password: pass,
        });
      } else {
        await this.accountUserRepository.update(user_id, { ...updateDto });
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Cập nhật tài khoản thành công',
      };
    } catch (err) {
      console.log(err);
      if (err.code === 'ER_DUP_ENTRY') {
        const errField = this.extractDuplicateField(err.sqlMessage);
        throw new ConflictException(`${errField} đã tồn tại.`);
      }

      throw new InternalServerErrorException('Không thể tạo người dùng mới');
    }
  }

  async findUser(email: string): Promise<AccountUsers> {
    const data = await this.accountUserRepository.findOne({
      where: { email: email },
    });
    return data;
  }

  async getUsers() {
    const data = await this.accountUserRepository.find({
      select: [
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'picture_url',
        'user_id',
        'status',
      ],
      where: { status: Not('delete') },
    });
    return data;
  }

  async getUserID(user_id: string) {
    const data = await this.accountUserRepository.findOne({
      select: [
        'first_name',
        'last_name',
        'email',
        'picture_url',
        'user_id',
        'phone_number',
        'link_facebook',
        'link_skype',
        'link_in',
      ],
      where: { user_id },
    });
    return data;
  }

  async getUserIDAdmin(user_id: string) {
    const data = await this.accountUserRepository.findOne({
      where: { user_id: user_id },
      relations: ['group_user'],
    });
    data && delete data.password;
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  async getUserIDs(user_ids: string[]) {
    const data = await this.accountUserRepository.find({
      select: ['first_name', 'last_name', 'email', 'picture_url', 'user_id'],
      where: { user_id: In(user_ids) },
    });
    const sortedData = user_ids.map((id) =>
      data.find((user) => user.user_id === id),
    );
    return sortedData;
  }

  async getGroupUser() {
    try {
      const data = await this.groupUserRepository.find();

      return {
        statusCode: HttpStatus.OK,
        data: data,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createGroupUser(createGroupUser: CreateGroupUserDto) {
    try {
      const id = uuidv4();
      const dataMew = this.groupUserRepository.create({
        ...createGroupUser,
        group_id: id,
      });
      await this.groupUserRepository.save(dataMew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteGroupUser(datas: string[]) {
    try {
      const rm = await this.groupUserRepository.delete({
        group_id: In(datas),
      });
      if (rm) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Đã xóa thành công',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Xóa thất bại',
      };
    }
  }

  async updateGroupUser(updateGroupUser: UpdateGroupUserDto) {
    try {
      await this.groupUserRepository.update(
        updateGroupUser.group_id,
        updateGroupUser,
      );
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getUserFilter(group?: string) {
    const whereCondition: any = {};
    if (group) {
      const group_user = await this.groupUserRepository.find({
        where: { group_id: group },
      });
      whereCondition.group_user = group_user;
    }
    // Lọc theo khoảng thời gian (date_start và date_expired)

    const data = await this.accountUserRepository.find({
      where: whereCondition,
      relations: ['group_user'],
    });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
