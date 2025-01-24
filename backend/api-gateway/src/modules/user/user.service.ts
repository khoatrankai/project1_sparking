import {
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { InfoUserInterface } from './interfaces/info-user.interface';
import { CreateRoleTypeUserDto } from './dto/create_role.dto';
import { UpdateRoleTypeUserDto } from './dto/update_role.dto';
import { CreateRoleUserDto } from './dto/create_role_user.dto';
import { UpdateRoleUserDto } from './dto/update_role_user.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update_user.dto';
import { CreateCategoryRoleUserDto } from './dto/create_category.dto';
import { UpdateCategoryRoleUserDto } from './dto/update_category.dto';
import { CreateGroupUserDto } from './dto/GroupUser/create_group.dto';
import { UpdateGroupUserDto } from './dto/GroupUser/update_group.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    @Inject('USER') private readonly usersClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async findOneInfo(user_id: string): Promise<InfoUserInterface> {
    try {
      const dataInfo = await firstValueFrom(
        this.usersClient.send({ cmd: 'find-profile' }, user_id),
      );
      return dataInfo;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createRoleType(createRoleTypeUserDto: CreateRoleTypeUserDto) {
    return this.usersClient.send(
      { cmd: 'create-role_type' },
      createRoleTypeUserDto,
    );
  }

  async sendDeleteRoleUser(datas: string[]) {
    return await firstValueFrom(
      this.usersClient.send('delete-role_type', datas),
    );
  }

  async sendDeleteUsers(datas: string[]) {
    return await firstValueFrom(this.usersClient.send('delete-user', datas));
  }

  async updateRoleType(updateRoleTypeUserDto: UpdateRoleTypeUserDto) {
    return this.usersClient.send(
      { cmd: 'update-role_type' },
      updateRoleTypeUserDto,
    );
  }

  async addRoleUser(createRoleUserDto: CreateRoleUserDto) {
    return this.usersClient.send({ cmd: 'add-role_user' }, createRoleUserDto);
  }

  async updateRoleUser(updateRoleUserDto: UpdateRoleUserDto) {
    return this.usersClient.send(
      { cmd: 'update-role_user' },
      updateRoleUserDto,
    );
  }

  async createUser(
    createUserDto: CreateUserDto,
    picture_url: Express.Multer.File,
  ) {
    const data = await this.cloudinaryService.uploadFile(picture_url);
    console.log(data);
    return this.usersClient.send(
      { cmd: 'register-user' },
      { ...createUserDto, picture_url: data.secure_url },
    );
  }

  async updateUser(
    user_id: string,
    updateUserDto: UpdateUserDto,
    picture_url: Express.Multer.File,
  ) {
    const data = picture_url
      ? await this.cloudinaryService.uploadFile(picture_url)
      : null;
    return this.usersClient.send(
      { cmd: 'update-user' },
      {
        user_id,
        updateUserDto: {
          ...updateUserDto,
          picture_url: data ? data.secure_url : undefined,
        },
      },
    );
  }

  async updatePasswordUser(
    req: Request,
    updateUserDto: {
      old_password: string;
      new_password: string;
      again_password: string;
    },
  ) {
    const user = req['user'];
    if (user) {
      return this.usersClient.send(
        { cmd: 'update-password_user' },
        {
          user_id: user.sub,
          updateUserDto,
        },
      );
    }
  }

  async getUsers() {
    return {
      statusCode: HttpStatus.OK,
      data: await firstValueFrom(
        this.usersClient.send({ cmd: 'get-users' }, {}),
      ),
    };
  }

  async getUserIDAdmin(user_id: string) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_id_admin' }, user_id),
    );
  }
  async getUserIDProfile(req: Request) {
    const user = req['user'];
    if (user) {
      return await firstValueFrom(
        this.usersClient.send({ cmd: 'get-user_id_admin' }, user.sub),
      );
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Lấy thông tin thất bại',
    };
  }

  async createCategoryRole(createCategoryRole: CreateCategoryRoleUserDto) {
    return await firstValueFrom(
      this.usersClient.send(
        { cmd: 'create-category_role' },
        createCategoryRole,
      ),
    );
  }

  async updateCategoryRole(
    id: string,
    updateCategoryRole: UpdateCategoryRoleUserDto,
  ) {
    return await firstValueFrom(
      this.usersClient.send(
        { cmd: 'update-category_role' },
        { id, updateCategoryRole },
      ),
    );
  }

  async deleteCategoryRole(ids: string[]) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'delete-category_role' }, ids),
    );
  }

  async getFullCategoryRole() {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'get-full_category_role' }, {}),
    );
  }

  async getFullRoleUserByID(id: string) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'get-full_role_user_id' }, id),
    );
  }

  async getFullRoleUserByAccess(req: Request) {
    const user = req['user'];
    if (user) {
      return await firstValueFrom(
        this.usersClient.send({ cmd: 'get-full_role_user_id' }, user.sub),
      );
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Lấy role thất bại',
    };
  }

  async updateFullRoleUserByID(data: { id: string; role_type: string[] }) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'update-full_role_user_id' }, data),
    );
  }

  async resetAdmin() {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'reset-admin' }, {}),
    );
  }

  async createFullCategoryRole(
    datas: { name_category: string; role_type: CreateRoleTypeUserDto[] }[],
  ) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'create-full_category_role' }, datas),
    );
  }

  async getGroupUser() {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'get-group_user' }, {}),
    );
  }

  async createGroupUser(creategroupUserDto: CreateGroupUserDto) {
    return this.usersClient.send(
      { cmd: 'create-group_user' },
      creategroupUserDto,
    );
  }

  async sendDeleteGroupUser(datas: string[]) {
    return await firstValueFrom(
      this.usersClient.send('delete-group_user', datas),
    );
  }

  async updateGroupUser(updateGroupUserDto: UpdateGroupUserDto) {
    return this.usersClient.send(
      { cmd: 'update-group_user' },
      updateGroupUserDto,
    );
  }

  async getUserFilter(group?: string) {
    return await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_filter' }, { group }),
    );
  }
}
