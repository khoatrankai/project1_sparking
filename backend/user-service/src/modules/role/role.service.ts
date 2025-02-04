import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { In, Repository } from 'typeorm';
import { RoleUser } from 'src/database/entities/role_user.entity';
import { RoleTypeUser } from 'src/database/entities/role_type_user.entity';
import { CreateRoleTypeUserDto } from 'src/dto/create_role.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateRoleTypeUserDto } from 'src/dto/update_role.dto';
import { CreateRoleUserDto } from 'src/dto/create_role_user.dto';
import { AccountUsers } from 'src/database/entities/account_users.entity';
import { UpdateRoleUserDto } from 'src/dto/update_role_user.dto';
import { CategoryRoleUser } from 'src/database/entities/category_role_user.entity';
import { CreateCategoryRoleUserDto } from 'src/dto/create_category.dto';
import { UpdateCategoryRoleUserDto } from 'src/dto/update_category.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleUser)
    private readonly roleUserRepository: Repository<RoleUser>,
    @InjectRepository(CategoryRoleUser)
    private readonly categoryRoleUserRepository: Repository<CategoryRoleUser>,
    private configService: ConfigService,
    @InjectRepository(RoleTypeUser)
    private readonly roleTypeUserRepository: Repository<RoleTypeUser>,
    @InjectRepository(AccountUsers)
    private readonly accountUserRepository: Repository<AccountUsers>,
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

  async createTypeRole(createRoleType: CreateRoleTypeUserDto) {
    try {
      const id = uuidv4();
      const category = await this.categoryRoleUserRepository.findOne({
        where: { category_id: createRoleType.category_role },
      });
      const dataNew = this.roleTypeUserRepository.create({
        ...createRoleType,
        role_type_id: id,
        category_role: category ?? null,
      });
      await this.roleTypeUserRepository.save(dataNew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteTypeRole(datas: string[]) {
    try {
      const rm = await this.roleTypeUserRepository.delete({
        role_type_id: In(datas),
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

  async updateTypeRole(updateTypeRole: UpdateRoleTypeUserDto) {
    try {
      await this.roleTypeUserRepository.update(
        updateTypeRole.role_type_id,
        updateTypeRole,
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

  async addRoleUser(createRoleUser: CreateRoleUserDto) {
    try {
      const id = uuidv4();
      const roleType = await this.roleTypeUserRepository.findOne({
        where: { role_type_id: createRoleUser.role_type },
      });
      const accountUser = await this.accountUserRepository.findOne({
        where: { user_id: createRoleUser.user_info },
      });
      if (roleType && accountUser) {
        const dataNew = this.roleUserRepository.create({
          ...createRoleUser,
          role_type: roleType,
          user_info: accountUser,
          role_id: id,
        });
        await this.roleUserRepository.save(dataNew);
        return {
          statusCode: HttpStatus.CREATED,
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async checkRoleUser(user_id: string, name_tag: string[]) {
    try {
      const user = await this.accountUserRepository.findOne({
        where: { user_id },
      });
      const role = await this.roleTypeUserRepository.find({
        where: { name_tag: In(name_tag) },
      });
      if (!user || !role) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      const roleTypeIds = role.map((r) => r.role_type_id);
      const check = await this.roleUserRepository.findOne({
        where: { user_info: user, role_type: In(roleTypeIds), status: true },
      });
      if (check) {
        return {
          statusCode: HttpStatus.OK,
        };
      }
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    } catch (err) {
      //console.log(err);
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updateRoleUser(updateRoleUser: UpdateRoleUserDto) {
    try {
      await this.roleUserRepository.update(
        updateRoleUser.role_id,
        updateRoleUser,
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

  async createCategoryRole(createCategoryRole: CreateCategoryRoleUserDto) {
    try {
      const id = uuidv4();
      const dataNew = this.categoryRoleUserRepository.create({
        ...createCategoryRole,
        category_id: id,
      });
      await this.categoryRoleUserRepository.save(dataNew);
      return {
        statusCode: HttpStatus.CREATED,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updateCategoryRole(
    id: string,
    updateCategoryRole: UpdateCategoryRoleUserDto,
  ) {
    try {
      await this.categoryRoleUserRepository.update(id, updateCategoryRole);
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async deleteCategoryRole(ids: string[]) {
    try {
      await this.categoryRoleUserRepository.delete({ category_id: In(ids) });
      return {
        statusCode: HttpStatus.OK,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getFullCategoryRoles() {
    try {
      const datas = await this.categoryRoleUserRepository.find({
        relations: ['role_type'],
      });
      return {
        statusCode: HttpStatus.OK,
        data: datas,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getFullRoleUserByID(id: string) {
    try {
      // const user = await this.accountUserRepository.findOneBy({ user_id: id });
      const datas = await this.roleUserRepository.find({
        where: { user_info: In([id]), status: true },
        relations: ['role_type'],
      });
      return {
        statusCode: HttpStatus.OK,
        data: datas,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updateFullRoleUserByID(data: { id: string; role_type: string[] }) {
    try {
      const user = await this.accountUserRepository.findOne({
        where: { user_id: data.id },
      });
      await this.roleUserRepository.delete({ user_info: user });
      const datas = await Promise.all(
        data.role_type.map(async (dt) => {
          const idRoleUser = uuidv4();
          const roleType = await this.roleTypeUserRepository.findOne({
            where: { role_type_id: dt },
          });
          const newRoleUser = this.roleUserRepository.create({
            role_id: idRoleUser,
            status: true,
            user_info: user,
            role_type: roleType,
          });
          return await this.roleUserRepository.save(newRoleUser);
        }),
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: datas,
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async resetRoleAdminTop() {
    try {
      const category = await this.categoryRoleUserRepository.findOne({
        where: { name_category: 'Admin' },
      });
      if (!category) {
        const id = uuidv4();
        const dataNew = this.categoryRoleUserRepository.create({
          category_id: id,
          name_category: 'Admin',
        });
        const res = await this.categoryRoleUserRepository.save(dataNew);
        const roleType = await this.roleTypeUserRepository.findOne({
          where: { name_tag: 'admin-top' },
        });
        if (!roleType) {
          const idRole = uuidv4();
          const dataRoleNew = this.roleTypeUserRepository.create({
            role_type_id: idRole,
            category_role: res,
            name_role: 'admin-top',
            name_tag: 'admin-top',
          });
          await this.roleTypeUserRepository.save(dataRoleNew);
        } else {
          await this.roleTypeUserRepository.update(roleType.role_type_id, {
            category_role: res,
          });
        }
      } else {
        const roleType = await this.roleTypeUserRepository.findOne({
          where: { category_role: category, name_tag: 'admin-top' },
        });
        if (!roleType) {
          const idRole = uuidv4();
          const dataRoleNew = this.roleTypeUserRepository.create({
            role_type_id: idRole,
            category_role: category,
            name_role: 'admin-top',
            name_tag: 'admin-top',
          });
          await this.roleTypeUserRepository.save(dataRoleNew);
        } else {
          await this.roleTypeUserRepository.update(roleType.role_type_id, {
            category_role: category,
          });
        }
      }
      const user = await this.accountUserRepository.findOne({
        where: { email: this.configService.get<string>('ADMIN') },
      });
      if (!user) {
        const idUser = uuidv4();
        const userNew = this.accountUserRepository.create({
          password: await this.hashPassword(
            this.configService.get<string>('PASSWORD'),
          ),
          first_name: 'Tran',
          last_name: 'Tan Khoa',
          email: this.configService.get<string>('ADMIN'),
          phone_number: '1234567890',
          sign_name: 'admin',
          status: 'active',
          user_id: idUser,
        });
        const res = await this.accountUserRepository.save(userNew);
        const roleType = await this.roleTypeUserRepository.findOne({
          where: { name_tag: 'admin-top' },
        });
        const idRoleUser = uuidv4();
        const roleUserNew = this.roleUserRepository.create({
          role_type: roleType,
          user_info: res,
          role_id: idRoleUser,
          status: true,
        });
        const resRoleUser = await this.roleUserRepository.save(roleUserNew);
        if (resRoleUser) {
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Đã reset thành công admin',
          };
        }
      } else {
        const roleType = await this.roleTypeUserRepository.findOne({
          where: { name_tag: 'admin-top' },
        });
        const idRoleUser = uuidv4();
        const roleUserNew = this.roleUserRepository.create({
          role_type: roleType,
          user_info: user,
          role_id: idRoleUser,
          status: true,
        });
        const resRoleUser = await this.roleUserRepository.save(roleUserNew);
        await this.accountUserRepository.update(user.user_id, {
          password: await this.hashPassword(
            this.configService.get<string>('PASSWORD'),
          ),
          first_name: 'Tran',
          last_name: 'Tan Khoa',
          email: this.configService.get<string>('ADMIN'),
          phone_number: '1234567890',
          sign_name: 'admin',
          status: 'active',
        });
        if (resRoleUser) {
          return {
            statusCode: HttpStatus.CREATED,
            message: 'Đã reset thành công admin',
          };
        }
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async createFullCategoryRole(
    datas: { name_category: string; role_type: CreateRoleTypeUserDto[] }[],
  ) {
    try {
      const dataRes = await Promise.all(
        datas.map(async (dt) => {
          const category = await this.categoryRoleUserRepository.findOne({
            where: { name_category: dt.name_category },
          });
          if (!category) {
            const idCategory = uuidv4();
            const dataCategoryNew = this.categoryRoleUserRepository.create({
              name_category: dt.name_category,
              category_id: idCategory,
            });
            const res =
              await this.categoryRoleUserRepository.save(dataCategoryNew);
            dt.role_type.forEach(async (dtt) => {
              const roleType = await this.roleTypeUserRepository.findOne({
                where: { name_tag: dtt.name_tag },
              });
              if (!roleType) {
                const idRoleType = uuidv4();
                const dataRoleTypeNew = this.roleTypeUserRepository.create({
                  ...dtt,
                  role_type_id: idRoleType,
                  category_role: res,
                });
                await this.roleTypeUserRepository.save(dataRoleTypeNew);
              } else {
                await this.roleTypeUserRepository.update(
                  roleType.role_type_id,
                  { category_role: res },
                );
              }
            });
            return res;
          } else {
            dt.role_type.forEach(async (dtt) => {
              const roleType = await this.roleTypeUserRepository.findOne({
                where: { name_tag: dtt.name_tag },
              });
              if (!roleType) {
                const idRoleType = uuidv4();
                const dataRoleTypeNew = this.roleTypeUserRepository.create({
                  ...dtt,
                  role_type_id: idRoleType,
                  category_role: category,
                });
                await this.roleTypeUserRepository.save(dataRoleTypeNew);
              } else {
                await this.roleTypeUserRepository.update(
                  roleType.role_type_id,
                  { category_role: category },
                );
              }
            });
            return category;
          }
        }),
      );
      if (dataRes.length > 0) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Đã khởi tạo danh sách quyền',
        };
      } else {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Khởi tạo danh sách quyền thất bại',
        };
      }
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi',
      };
    }
  }
}
