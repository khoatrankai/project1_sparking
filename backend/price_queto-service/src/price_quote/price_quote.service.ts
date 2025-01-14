/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePriceQuoteDto } from 'src/dto/PriceQuoteDto/create_price_quote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceQuote } from 'src/database/entities/price_quote.entity';
import { v4 as uuidv4 } from 'uuid';

import {
  Between,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { UpdatePriceQuoteDto } from 'src/dto/PriceQuoteDto/update_price_quote.dto';
import { CreateListProductDto } from 'src/dto/ListProductDto/create_list_product.dto';
import { ListProduct } from 'src/database/entities/list_product.entity';
import { UpdateListProductDto } from 'src/dto/ListProductDto/update_list_product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PriceQuoteFilterDto } from 'src/dto/PriceQuoteDto/get_filter_price_quote.dto';
import { ListParts } from 'src/database/entities/list_part.entity';
import { CreateListPartDto } from 'src/dto/ListPartDto/create_list_part.dto';
import { UpdateListPartDto } from 'src/dto/ListPartDto/update_list_part.dto';
import { ListDetailProduct } from 'src/database/entities/list_detail_product.entity';
import { reverse } from 'dns';
import { TypePackage } from 'src/database/entities/type_package.entity';
import { CreateTypePackageDto } from 'src/dto/TypePackageDto/create_type_package.dto';
import { UpdateTypePackageDto } from 'src/dto/TypePackageDto/update_type_package.dto';

@Injectable()
export class PriceQuoteService {
  constructor(
    @Inject('USER') private readonly usersClient: ClientProxy,
    @Inject('PRODUCT') private readonly productsClient: ClientProxy,
    @Inject('SYSTEM') private readonly systemClient: ClientProxy,
    @Inject('PROJECT') private readonly projectsClient: ClientProxy,
    @InjectRepository(PriceQuote)
    private readonly priceQuoteRepository: Repository<PriceQuote>,
    @InjectRepository(TypePackage)
    private readonly typePackageRepository: Repository<TypePackage>,
    @InjectRepository(ListParts)
    private readonly listPartRepository: Repository<ListParts>,
    @InjectRepository(ListDetailProduct)
    private readonly listDetailRepository: Repository<ListDetailProduct>,
    @InjectRepository(ListProduct)
    private listProductRepository: Repository<ListProduct>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createPriceQuote(createPriceQuoteDto: CreatePriceQuoteDto) {
    const { parts, ...dataPriceQuote } = createPriceQuoteDto;
    const priceQuote = this.priceQuoteRepository.create({
      ...dataPriceQuote,
      price_quote_id: uuidv4(),
    });
    const resPriceQuote = await this.priceQuoteRepository.save(priceQuote);
    if (resPriceQuote) {
      const resList = await this.createListParts(parts, resPriceQuote);
      if (resList.length > 0) {
        return {
          statusCode: HttpStatus.CREATED,
          message: 'Tạo báo giá thành công',
        };
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo báo giá thành công nhưng danh sách không được tạo',
      };
    }
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Tạo báo giá không thành công',
    };
  }

  async deletePriceQuote(datas: string[]) {
    try {
      const rm = await this.priceQuoteRepository.delete({
        price_quote_id: In(datas),
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

  async findOnePriceQuote(id: string) {
    const priceQuote = await this.priceQuoteRepository.findOne({
      where: { price_quote_id: id },
      relations: [
        'parts',
        'parts.products',
        'parts.products.list_detail',
        'parts.type_package',
      ],
    });
    // console.log(priceQuote.parts[0].products)
    const resParts = await Promise.all(
      priceQuote.parts.map(async (dt) => {
        const productIds = dt.products.map((dt) => dt.product);
        const dataProducts = await firstValueFrom(
          this.productsClient.send({ cmd: 'get-product_ids' }, productIds),
        );
        return {
          ...dt,
          products:
            dataProducts.map((dtt, index) => {
              return {
                ...dtt,
                ...dt?.products[index],
                list_detail: dt.products[index].list_detail,
              };
            }) ?? [],
        };
      }),
    );
    return {
      ...priceQuote,
      parts: resParts
        .map((dt) => {
          return {
            ...dt,
            products: dt.products
              .map((dtt) => {
                return {
                  ...dtt,
                  list_detail: dtt.list_detail.sort(
                    (a, b) =>
                      new Date(a.created_at).getTime() -
                      new Date(b.created_at).getTime(),
                  ),
                };
              })
              .sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime(),
              ),
          };
        })
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        ),
    };
  }

  async findOneFullPriceQuote(id: string) {
    const priceQuote = await this.priceQuoteRepository.findOne({
      where: { price_quote_id: id },
      relations: ['parts', 'parts.products', 'parts.products.list_detail'],
    });
    const dataProject = await firstValueFrom(
      this.projectsClient.send(
        { cmd: 'find-one_full_project' },
        priceQuote.project,
      ),
    );
    const dataUser = await firstValueFrom(
      this.usersClient.send(
        { cmd: 'get-user_id' },
        priceQuote.user_support ?? '',
      ),
    );
    const resParts = await Promise.all(
      priceQuote.parts.map(async (dt) => {
        const productIds = dt.products.map((dt) => dt.product);
        const profitIds = dt.products.map((dt) => dt.profit);
        const dataProducts = await firstValueFrom(
          this.productsClient.send({ cmd: 'get-product_ids' }, productIds),
        );
        const dataProfits = await firstValueFrom(
          this.systemClient.send({ cmd: 'get-profit_ids' }, profitIds),
        );
        return {
          ...dt,
          products:
            dataProducts.map((dtt, index) => {
              return {
                ...dtt,
                ...dt?.products[index],
                profit: dataProfits[index],
                list_detail: dt.products[index].list_detail,
              };
            }) ?? [],
        };
      }),
    );
    return {
      ...priceQuote,
      parts: resParts
        .map((dt) => {
          return {
            ...dt,
            products: dt.products
              .map((dtt) => {
                return {
                  ...dtt,
                  list_detail: dtt.list_detail.sort(
                    (a, b) =>
                      new Date(a.created_at).getTime() -
                      new Date(b.created_at).getTime(),
                  ),
                };
              })
              .sort(
                (a, b) =>
                  new Date(a.created_at).getTime() -
                  new Date(b.created_at).getTime(),
              ),
          };
        })
        .sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        ),
      project: dataProject.data,
      user_support: dataUser,
    };
  }

  async findAllPriceQuote(filter?: PriceQuoteFilterDto) {
    // const data = await this.priceQuoteRepository.find({ relations: ['products'] });
    // const userIds = data.map((dt)=>dt.user_support)
    // const projectIds = data.map((dt)=>dt.project)
    // const dataUsers = await firstValueFrom(this.usersClient.send({cmd:'get-user_ids'},userIds))
    // const dataProjects = await firstValueFrom(this.projectsClient.send({cmd:'get-project_ids'},projectIds))
    // return data.map((dt,index)=>{
    //   return{...dt,user_support:dataUsers[index],project:dataProjects[index]}
    // })

    const project = filter.project ?? null;
    const customer = filter.customer ?? null;
    const type_date = Number(filter.type_date) ?? null;
    const date_start = filter.date_start ? new Date(filter.date_start) : null;
    const date_expired = filter.date_expired
      ? new Date(filter.date_expired)
      : null;
    const status = filter.status ?? null;
    const user_support = filter.user_support ?? null;

    const whereCondition: any = {};
    if (customer) {
      const projects = await firstValueFrom(
        this.projectsClient.send({ cmd: 'find-all_projects' }, { customer }),
      );
      whereCondition.project = In(
        projects.data.map((dt: any) => dt.project_id),
      );
    } else {
      if (project) {
        whereCondition.project = In([project]);
      }
    }

    // Lọc theo staff_support
    if (user_support) {
      whereCondition.user_support = user_support;
    }

    // Lọc theo khoảng thời gian (date_start và date_expired)
    if (date_start || date_expired) {
      if (!type_date) {
        if (date_start && date_expired) {
          whereCondition.date_start = Between(date_start, date_expired);
        } else {
          if (date_start) {
            whereCondition.date_start = MoreThanOrEqual(date_start);
          }
          if (date_expired) {
            whereCondition.date_start = LessThanOrEqual(date_expired);
          }
        }
      } else {
        if (date_start && date_expired) {
          whereCondition.date_expired = Between(date_start, date_expired);
        } else {
          if (date_start) {
            whereCondition.date_expired = MoreThanOrEqual(date_start);
          }
          if (date_expired) {
            whereCondition.date_expired = LessThanOrEqual(date_expired);
          }
        }
      }
    }

    // Lọc theo status
    if (status) {
      whereCondition.status = status;
    }

    // Lấy dữ liệu từ repository dựa trên điều kiện whereCondition
    const result = await this.priceQuoteRepository.find({
      where: whereCondition,
      relations: ['parts', 'parts.products'],
    });

    const userIds = result.map((dt) => dt.user_support);
    const projectIds = result.map((dt) => dt.project);
    const dataUsers = await firstValueFrom(
      this.usersClient.send({ cmd: 'get-user_ids' }, userIds),
    );
    const dataProjects = await firstValueFrom(
      this.projectsClient.send({ cmd: 'get-project_ids' }, projectIds),
    );
    return result.map((dt, index) => {
      return {
        ...dt,
        user_support: dataUsers[index],
        project: dataProjects[index],
      };
    });

    // return result;
  }

  async updatePriceQuote(id: string, updatePriceQuoteDto: UpdatePriceQuoteDto) {
    const { parts, ...reqUpdatePriceQuote } = updatePriceQuoteDto;
    await this.priceQuoteRepository.update(id, reqUpdatePriceQuote);
    const updatedPriceQuote = await this.priceQuoteRepository.findOne({
      where: { price_quote_id: id },
      relations: ['parts', 'parts.products', 'parts.products.list_detail'],
    });
    if (!updatedPriceQuote) {
      throw new NotFoundException(`PriceQuote with ID ${id} not found`);
    }
    await this.listDetailRepository.delete({
      PQ_product: In(
        updatedPriceQuote.parts
          .map((dt) => dt.products.map((dtt) => dtt.PQ_product_id))
          .flat(),
      ),
    });
    await this.listProductRepository.delete({
      PQ_product_id: In(
        updatedPriceQuote.parts
          .map((dt) => dt.products.map((dtt) => dtt.PQ_product_id))
          .flat(),
      ),
    });

    await this.listPartRepository.delete({ price_quote: updatedPriceQuote });

    await this.createListParts(parts, updatedPriceQuote);
    return [];
    // if(resList.length>0){
    //   return {
    //     statusCode:HttpStatus.CREATED,
    //     message:"Cập nhật báo giá thành công"
    //   }
    // }
    // return {
    //   statusCode:HttpStatus.CREATED,
    //   message:"Cập nhật báo giá thành công nhưng danh sách không được tạo"
    // }
  }

  async updateStatusPriceQuote(
    listPriceQuote: { price_quote_id: string; status: string }[],
  ) {
    console.log(listPriceQuote);
    const data = Promise.all(
      listPriceQuote.map(async (dt) => {
        await this.priceQuoteRepository.update(dt.price_quote_id, {
          status: dt.status,
        });
      }),
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật trạng thái thành công',
    };
  }

  async createListProducts(
    createListProductDto: CreateListProductDto[],
    part: ListParts,
  ) {
    const listProduct = createListProductDto.map((dt) => {
      const { list_detail, ...dataCreate } = dt;
      const id = uuidv4();
      return this.listProductRepository.create({
        ...dataCreate,
        PQ_product_id: id,
        part,
      });
    });
    const dataProduct = await this.listProductRepository.save(listProduct);
    await Promise.all(
      dataProduct.map(async (dt, index) => {
        const listCreate = createListProductDto?.[index]?.list_detail?.map(
          (dtt) => {
            return this.listDetailRepository.create({
              ...dtt,
              detail_id: uuidv4(),
              PQ_product: dt,
            });
          },
        );
        return createListProductDto?.[index]?.list_detail
          ? await this.listDetailRepository.save(listCreate)
          : '';
      }),
    );
    return;
  }

  async deleteListProducts(datas: string[]) {
    try {
      const rm = await this.listProductRepository.delete({
        PQ_product_id: In(datas),
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

  async findOneListProduct(id: string) {
    const listProduct = await this.listProductRepository.findOne({
      where: { PQ_product_id: id },
    });
    if (!listProduct) {
      throw new NotFoundException('ListProduct not found');
    }
    return listProduct;
  }

  async findAllListProduct() {
    return await this.listProductRepository.find();
  }

  async updateListProduct(
    id: string,
    updateListProductDto: UpdateListProductDto,
  ) {
    return await this.listProductRepository.update(id, updateListProductDto);
  }

  async removeListProduct(id: string) {
    const result = await this.listProductRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('ListProduct not found');
    }
  }

  async createListParts(
    createListPartDto: CreateListPartDto[],
    price_quote: PriceQuote,
  ) {
    const listPart = await Promise.all(
      createListPartDto.map(async (dt) => {
        const id = uuidv4();
        const typePackage = dt.type_package
          ? await this.typePackageRepository.findOne({
              where: { package_id: dt.type_package },
            })
          : null;
        return this.listPartRepository.create({
          title: dt.title,
          part_id: id,
          price_quote,
          type_package: typePackage,
        });
      }),
    );

    const dataListPart = await this.listPartRepository.save(listPart);
    Promise.all(
      dataListPart.map(async (dt, index) => {
        await this.createListProducts(createListPartDto[index].products, dt);
      }),
    );
    return dataListPart;
  }

  async deleteListParts(datas: string[]) {
    try {
      const rm = await this.listPartRepository.delete({ part_id: In(datas) });
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

  async findOneListPart(id: string) {
    const listPart = await this.listPartRepository.findOne({
      where: { part_id: id },
    });
    if (!listPart) {
      throw new NotFoundException('ListPart not found');
    }
    return listPart;
  }

  async findAllListPart() {
    return await this.listPartRepository.find();
  }

  async updateListPart(id: string, updateListPartDto: UpdateListPartDto) {
    const typePackage = updateListPartDto.type_package
      ? await this.typePackageRepository.findOne({
          where: { package_id: updateListPartDto.type_package },
        })
      : null;
    // console.log(typePackage, updateListPartDto);
    return await this.listPartRepository.update(id, {
      ...updateListPartDto,
      type_package: typePackage,
    });
  }

  async removeListPart(id: string) {
    const result = await this.listPartRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('ListPart not found');
    }
  }

  async createTypePackage(createTypePackageDto: CreateTypePackageDto) {
    try {
      const id = uuidv4();
      const typePackage = this.typePackageRepository.create({
        ...createTypePackageDto,
        package_id: id,
      });
      await this.typePackageRepository.save(typePackage);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo gói thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tạo thất bại',
      };
    }
  }

  async deleteTypePackage(datas: string[]) {
    try {
      const rm = await this.typePackageRepository.delete({
        package_id: In(datas),
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

  async findAllTypePackage() {
    const data = await this.typePackageRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  async findFullTypePackageYearCurrent() {
    const data = await this.priceQuoteRepository
      .createQueryBuilder('priceQuote')
      .leftJoin('priceQuote.parts', 'parts')
      .leftJoin('parts.type_package', 'type_package')
      .leftJoin('parts.products', 'products')
      .where('priceQuote.status = :status', { status: 'accept' })
      .select('type_package')
      .addSelect('SUM(products.price * products.quantity)', 'total')
      .groupBy('type_package')
      .getRawMany();
    return {
      statusCode: HttpStatus.OK,
      data: data
        .map((dt) => {
          if (dt.type_package_name_package) {
            return { ...dt, total: Number(dt.total) };
          }
          return {
            ...dt,
            total: Number(dt.total),
            type_package_name_package: 'Other',
          };
        })
        .sort((a, b) => b.total - a.total),
    };
  }

  async findOneTypePackage(id: string) {
    const data = await this.typePackageRepository.findOne({
      where: { package_id: id },
    });
    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  async getFullRevenueByNameType(name: string) {
    const data = await this.typePackageRepository
      .createQueryBuilder('typePackage')
      .leftJoin('typePackage.parts', 'parts')
      .leftJoin('parts.products', 'products')
      .leftJoin('parts.price_quote', 'price_quote')
      .where('typePackage.name_package = :name', { name })
      .select('price_quote.project', 'project')
      .addSelect('products.profit', 'profit')
      .addSelect('SUM(products.price * products.quantity)', 'total')
      .groupBy('project,profit')
      .getRawMany();

    const dataProfits = await firstValueFrom(
      this.systemClient.send({ cmd: 'get-profits' }, {}),
    );
    const resProjects = await firstValueFrom(
      this.projectsClient.send({ cmd: 'find-all_projects' }, {}),
    );
    if (dataProfits && resProjects.statusCode === 200) {
      const dataProjects = resProjects.data;
      return {
        statusCode: HttpStatus.OK,
        data: data.reduce((preValue, currValue) => {
          const profit = dataProfits.find(
            (dtt) => dtt.profit_id === currValue.profit,
          ).type_profit;
          const project = dataProjects.find(
            (dtt) => dtt.project_id === currValue.project,
          ).name;
          const dataFind = preValue.find((dtt) => dtt.project === project);
          if (dataFind) {
            dataFind.total +=
              (Number(currValue.total) * profit) / 100 +
              Number(currValue.total);
          } else {
            preValue.push({
              project: project,
              total:
                (Number(currValue.total) * profit) / 100 +
                Number(currValue.total),
            });
          }
          return preValue;
        }, []),
      };
    }

    return {
      statusCode: HttpStatus.OK,
      data: data,
    };
  }

  async updateTypePackage(
    id: string,
    updateTypePackageDto: UpdateTypePackageDto,
  ) {
    await this.typePackageRepository.update(id, updateTypePackageDto);
    // return await this.typePackageRepository.findOne({where:{package_id:id}});
    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật thành công',
    };
  }
}
