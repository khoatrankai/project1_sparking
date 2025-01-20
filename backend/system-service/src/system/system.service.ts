import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { In, Repository } from 'typeorm';

import { Label } from 'src/database/entities/label.entity';
import { CreateLabelDto } from 'src/dto/label/create_label.dto';
import { UnitProduct } from 'src/database/entities/unit_product.entity';
import { CreateUnitProductDto } from 'src/dto/create_unit_product.dto copy';
import { UpdateUnitProductDto } from 'src/dto/update_unit_product.dto';
import { CreateProvinceDto } from 'src/dto/create_province.dto';
import { UpdateProvinceDto } from 'src/dto/update_province.dto';
import { Province } from 'src/database/entities/province.entity';
import { Product } from 'src/database/entities/product.entity';
import { CreateProductDto } from 'src/dto/create_product.dto';
import { UpdateProductDto } from 'src/dto/update_product.dto';
import { CreatePictureProductDto } from 'src/dto/create_picture_product.dto';
import { UpdatePictureProductDto } from 'src/dto/update_picture_product.dto';
import { PictureProduct } from 'src/database/entities/picture_product.entity';
import { ListUseProduct } from 'src/database/entities/list_use_product.entity';
import { CreateListUseProductDto } from 'src/dto/create_list_user_product.dto';
import { UpdateListUseProductDto } from 'src/dto/update_list_user_product.dto';
import { CreateVatDto } from 'src/dto/create_vat.dto';
import { Vats } from 'src/database/entities/vat.entity';
import { UpdateVatDto } from 'src/dto/update_vat.dto';
import { Profits } from 'src/database/entities/profit.entity';
import { CreateProfitDto } from 'src/dto/create_profit.dto';
import { UpdateProfitDto } from 'src/dto/update_profit.dto';
import { CreateLinkSystemDto } from 'src/dto/create_link_system.dto';
import { LinkSystems } from 'src/database/entities/link_system.entity';
import { UpdateLinkSystemDto } from 'src/dto/update_link_system.dto';
import { CreateTargetRevenueDto } from 'src/dto/TargetRevenue/create_target_revenue.dto';
import { TargetRevenue } from 'src/database/entities/target_revenue.entity';
import { UpdateTargetRevenueDto } from 'src/dto/TargetRevenue/update_target_revenue.dto';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
    @InjectRepository(LinkSystems)
    private readonly linkSystemRepository: Repository<LinkSystems>,
    @InjectRepository(UnitProduct)
    private readonly unitProductRepository: Repository<UnitProduct>,
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
    @InjectRepository(TargetRevenue)
    private readonly targetRevenueRepository: Repository<TargetRevenue>,
    @InjectRepository(Vats) private readonly vatRepository: Repository<Vats>,
    @InjectRepository(Profits)
    private readonly profitRepository: Repository<Profits>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(PictureProduct)
    private readonly pictureProductRepository: Repository<PictureProduct>,
    @InjectRepository(ListUseProduct)
    private readonly listUseProductRepository: Repository<ListUseProduct>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createLabel(createLabel: CreateLabelDto) {
    try {
      const newLabel = this.labelRepository.create({
        ...createLabel,
        label_id: uuidv4(),
      });
      await this.labelRepository.save(newLabel);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Tạo label thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Tạo label không thành công',
      };
    }
  }

  async deleteLabel(deleteLabel: string) {
    try {
      const newLabel = this.labelRepository.delete(deleteLabel);
      if ((await newLabel).affected === 0) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Label không được tìm thấy',
        };
      }
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Label xóa thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi xóa label không thành công',
      };
    }
  }

  async createUnitProduct(createUnitProductDto: CreateUnitProductDto) {
    try {
      const newTypeProduct = this.unitProductRepository.create({
        ...createUnitProductDto,
        unit_id: uuidv4(),
      });
      await this.unitProductRepository.save(newTypeProduct);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Type tạo thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Lỗi tạo không thành công',
      };
    }
  }

  async updateUnitProduct(updateUnitProductDto: UpdateUnitProductDto) {
    await this.unitProductRepository.update(
      updateUnitProductDto.unit_id,
      updateUnitProductDto,
    );
    return this.unitProductRepository.findOne({
      where: { unit_id: updateUnitProductDto.unit_id },
    });
  }

  async getAllUnitProducts() {
    return await this.unitProductRepository.find();
  }

  async getUnitProductById(unit_id: string) {
    return await this.unitProductRepository.findOne({ where: { unit_id } });
  }

  async getLinkSystemByNameTag(name_tag: string) {
    return await this.linkSystemRepository.findOne({ where: { name_tag } });
  }

  async deleteUnitProduct(unit_id: string) {
    return await this.unitProductRepository.delete(unit_id);
  }

  async createProvince(createProvinceDto: CreateProvinceDto) {
    const newProvince = this.provinceRepository.create(createProvinceDto);
    await this.provinceRepository.save(newProvince);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tạo thành công',
    };
  }

  async createTarget(createTargetRevenue: CreateTargetRevenueDto) {
    const newTarget = this.targetRevenueRepository.create(createTargetRevenue);
    await this.targetRevenueRepository.save(newTarget);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tạo thành công',
    };
  }

  async updateTarget(id: string, updateTargetRevenue: UpdateTargetRevenueDto) {
    try {
      await this.targetRevenueRepository.update(id, updateTargetRevenue);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật thất bại',
      };
    }
  }

  async getAllTarget() {
    const data = await this.targetRevenueRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getTarget(id: string) {
    const data = await this.targetRevenueRepository.findOneBy({
      target_id: id,
    });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async deleteProvinces(datas: string[]) {
    try {
      const rm = await this.provinceRepository.delete({
        province_id: In(datas),
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

  async updateLinkSystem(id: string, updateLinkSystemDto: UpdateLinkSystemDto) {
    try {
      await this.linkSystemRepository.update(id, updateLinkSystemDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Cập nhật thành công',
      };
    } catch {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cập nhật thất bại',
      };
    }
  }

  async createProvinces(createProvincesDto: CreateProvinceDto[]) {
    const newProvince = this.provinceRepository.create(createProvincesDto);
    return await this.provinceRepository.save(newProvince);
  }

  async createLinkSystem(createLinkSystemDto: CreateLinkSystemDto) {
    const newLinkSystem = this.linkSystemRepository.create(createLinkSystemDto);
    await this.linkSystemRepository.save(newLinkSystem);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tạo thành công',
    };
  }

  async createLinkSystems(createLinkSystemsDto: CreateLinkSystemDto[]) {
    const newLinkSystem =
      this.linkSystemRepository.create(createLinkSystemsDto);
    return await this.linkSystemRepository.save(newLinkSystem);
  }

  async createVat(createVat: CreateVatDto) {
    const newVat = this.vatRepository.create(createVat);
    await this.vatRepository.save(newVat);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tạo thành công',
    };
  }

  async updateVat(updateVat: UpdateVatDto) {
    await this.vatRepository.update(updateVat.vat_id, {
      type_vat: updateVat.type_vat,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tạo thành công',
    };
  }

  async getAllVat() {
    const data = await this.vatRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getVat(id: string) {
    const data = await this.vatRepository.findOneBy({ vat_id: id });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getAllLinkSystem() {
    const data = await this.linkSystemRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async getLinkSystem(id: string) {
    const data = await this.linkSystemRepository.findOneBy({
      link_system_id: id,
    });
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async createVats(createVatsDto: CreateVatDto[]) {
    const newVat = this.vatRepository.create(createVatsDto);
    return await this.vatRepository.save(newVat);
  }

  async deleteVats(datas: string[]) {
    try {
      const rm = await this.vatRepository.delete({ vat_id: In(datas) });
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

  async createProfit(createProfit: CreateProfitDto) {
    const newProfit = this.profitRepository.create(createProfit);
    await this.profitRepository.save(newProfit);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Tạo thành công',
    };
  }

  async updateProfit(updateProfit: UpdateProfitDto) {
    await this.profitRepository.update(updateProfit.profit_id, {
      type_profit: updateProfit.type_profit,
    });
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Cập nhật thành công',
    };
  }

  async getAllProfit() {
    const data = await this.profitRepository.find();
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  async createProfits(createProfitsDto: CreateProfitDto[]) {
    const newProfit = this.profitRepository.create(createProfitsDto);
    return await this.profitRepository.save(newProfit);
  }

  async deleteProfits(datas: string[]) {
    try {
      const rm = await this.profitRepository.delete({ profit_id: In(datas) });
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

  async updateProvince(updateProvinceDto: UpdateProvinceDto) {
    await this.provinceRepository.update(
      updateProvinceDto.province_id,
      updateProvinceDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Cập nhật thành công',
    };
  }

  async getAllProvinces() {
    return await this.provinceRepository.find();
  }

  async getAllVats() {
    return await this.vatRepository.find();
  }

  async getAllProfits() {
    return await this.profitRepository.find();
  }

  async getProfit(id: string) {
    return {
      statusCode: HttpStatus.OK,
      data: await this.profitRepository.findOneBy({ profit_id: id }),
    };
  }

  async getProfitIDs(profit_ids: string[]) {
    const data = await this.profitRepository.find({
      where: { profit_id: In(profit_ids) },
    });
    const sortedData = profit_ids.map((id) =>
      data.find((item) => item.profit_id === id),
    );
    return sortedData;
  }

  async getProvinceById(province_id: string) {
    return await this.provinceRepository.findOne({ where: { province_id } });
  }

  async deleteProvince(province_id: string) {
    return await this.provinceRepository.delete(province_id);
  }

  async createProduct(createProductDto: CreateProductDto) {
    const unitProduct = await this.unitProductRepository.findOne({
      where: { unit_id: createProductDto.unit_product },
    });
    const newProduct = this.productRepository.create({
      ...createProductDto,
      unit_product: unitProduct,
      product_id: uuidv4(),
    });
    return await this.productRepository.save(newProduct);
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    const unitProduct = await this.unitProductRepository.findOne({
      where: { unit_id: updateProductDto.unit_product },
    });
    await this.productRepository.update(updateProductDto.product_id, {
      ...updateProductDto,
      unit_product: unitProduct,
    });
    return this.productRepository.findOne({
      where: { product_id: updateProductDto.product_id },
    });
  }

  async getAllProducts() {
    return await this.productRepository.find({ relations: ['type_product'] });
  }

  async getProductById(product_id: string) {
    return await this.productRepository.findOne({
      where: { product_id },
      relations: ['type_product'],
    });
  }

  async deleteProduct(product_id: string) {
    return await this.productRepository.delete(product_id);
  }

  async createPictureProduct(createPictureProductDto: CreatePictureProductDto) {
    const newPicture = this.pictureProductRepository.create({
      ...createPictureProductDto,
      picture_id: uuidv4(),
    });
    return await this.pictureProductRepository.save(newPicture);
  }

  async updatePictureProduct(updatePictureProductDto: UpdatePictureProductDto) {
    await this.pictureProductRepository.update(
      updatePictureProductDto.picture_id,
      updatePictureProductDto,
    );
    return this.pictureProductRepository.findOne({
      where: { picture_id: updatePictureProductDto.picture_id },
      relations: ['product'],
    });
  }

  async getAllPictureProducts() {
    return await this.pictureProductRepository.find({ relations: ['product'] });
  }

  async getPictureProductById(picture_id: string) {
    return await this.pictureProductRepository.findOne({
      where: { picture_id },
      relations: ['product'],
    });
  }

  async deletePictureProduct(picture_id: string) {
    return await this.pictureProductRepository.delete(picture_id);
  }

  async createListUseProduct(createListUseProductDto: CreateListUseProductDto) {
    const product = await this.productRepository.findOne({
      where: { product_id: createListUseProductDto.product },
    });
    const newListUseProduct = this.listUseProductRepository.create({
      ...createListUseProductDto,
      use_id: uuidv4(),
      product: product,
    });
    return await this.listUseProductRepository.save(newListUseProduct);
  }

  async updateListUseProduct(updateListUseProductDto: UpdateListUseProductDto) {
    const product = await this.productRepository.findOne({
      where: { product_id: updateListUseProductDto.product },
    });
    await this.listUseProductRepository.update(
      { use_id: updateListUseProductDto.use_id },
      { ...updateListUseProductDto, product: product },
    );
    return this.listUseProductRepository.findOne({
      where: { use_id: updateListUseProductDto.use_id },
      relations: ['product'],
    });
  }

  async getAllListUseProducts() {
    return await this.listUseProductRepository.find({ relations: ['product'] });
  }

  async getListUseProductById(use_id: string) {
    return await this.listUseProductRepository.findOne({
      where: { use_id },
      relations: ['product'],
    });
  }

  async deleteListUseProduct(use_id: string) {
    return await this.listUseProductRepository.delete({ use_id });
  }

  async getListProductType(data) {
    const listData = await this.listUseProductRepository.find({
      where: { type_use_id: data.type_id },
      relations: ['product'],
    });
    return listData;
  }
}
