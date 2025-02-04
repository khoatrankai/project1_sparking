import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateListUseProductDto } from './dto/create_list_user_product.dto';
import { CreatePictureProductDto } from './dto/create_picture_product.dto';
import { CreateProductDto } from './dto/create_product.dto';
import { CreateProvinceDto } from './dto/create_province.dto';
import { CreateTypeProductDto } from './dto/create_type_product.dto copy';
import { CreateLabelDto } from './dto/label/create_label.dto';
import { UpdateListUseProductDto } from './dto/update_list_user_product.dto';
import { UpdatePictureProductDto } from './dto/update_picture_product.dto';
import { UpdateProductDto } from './dto/update_product.dto';
import { UpdateProvinceDto } from './dto/update_province.dto copy';
import { UpdateTypeProductDto } from './dto/update_type_product.dto';
import { GetProvinceDto } from './dto/getProvinces';
import { firstValueFrom } from 'rxjs';
import { CreateVatDto } from './dto/create_vat.dto';
import { UpdateVatDto } from './dto/update_vat.dto';
import { CreateUnitProductDto } from './dto/create_unit_product.dto';
import { UpdateUnitProductDto } from './dto/update_unit_product.dto';
import { CreateProfitDto } from './dto/create_profit.dto';
import { UpdateProfitDto } from './dto/update_profit.dto';
import { CreateLinkSystemDto } from './dto/create_link_system.dto';
import { UpdateLinkSystemDto } from './dto/update_link_system.dto';
import { CreateTargetRevenueDto } from './dto/TargetRevenue/create_target_revenue.dto';
import { UpdateTargetRevenueDto } from './dto/TargetRevenue/update_target_revenue.dto';

@Injectable()
export class SystemService {
  constructor(@Inject('SYSTEM') private readonly systemClient: ClientProxy) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createLabel(createLabelDto: CreateLabelDto) {
    return this.systemClient.send({ cmd: 'create-label' }, createLabelDto);
  }

  async deleteLabel(labelId: string) {
    return this.systemClient.send({ cmd: 'delete-label' }, labelId);
  }

  // Type Product methods
  async createTypeProduct(createTypeProductDto: CreateTypeProductDto) {
    return this.systemClient.send(
      { cmd: 'create-type_product' },
      createTypeProductDto,
    );
  }

  async updateTypeProduct(updateTypeProductDto: UpdateTypeProductDto) {
    return this.systemClient.send(
      { cmd: 'update-type_product' },
      updateTypeProductDto,
    );
  }

  async getAllTypeProducts() {
    return this.systemClient.send({ cmd: 'get-all_type_products' }, {});
  }

  async getTypeProductById(typeId: string) {
    return this.systemClient.send({ cmd: 'get-type_product_by_id' }, typeId);
  }

  async deleteTypeProduct(typeId: string) {
    return this.systemClient.send({ cmd: 'delete-type_product' }, typeId);
  }

  // Province methods
  async createProvince(createProvinceDto: CreateProvinceDto) {
    return this.systemClient.send(
      { cmd: 'create-province' },
      createProvinceDto,
    );
  }

  async sendDeleteProvince(datas: string[]) {
    return await firstValueFrom(
      this.systemClient.send('delete-provinces', datas),
    );
  }

  async createProvinces(createProvincesDto: CreateProvinceDto[]) {
    //console.log(createProvincesDto);
    return this.systemClient.send(
      { cmd: 'create-provinces' },
      createProvincesDto,
    );
  }

  async createLinkSystem(createLinkSystemDto: CreateLinkSystemDto) {
    return this.systemClient.send(
      { cmd: 'create-link_system' },
      createLinkSystemDto,
    );
  }

  async updateLinkSystem(id: string, updateLinkSystemDto: UpdateLinkSystemDto) {
    return this.systemClient.send(
      { cmd: 'update-link_system' },
      { id, data: updateLinkSystemDto },
    );
  }

  async createLinksSystem(createLinksSystemDto: CreateLinkSystemDto[]) {
    return this.systemClient.send(
      { cmd: 'create-links_system' },
      createLinksSystemDto,
    );
  }

  async getLinkSystemByNameTag(name_tag: string) {
    return this.systemClient.send({ cmd: 'get-link_system' }, name_tag);
  }

  async getLinkSystem(id: string) {
    return this.systemClient.send({ cmd: 'get-one_link_system' }, id);
  }

  async getAllLinkSystem() {
    return this.systemClient.send({ cmd: 'get-all_link_system' }, {});
  }

  async createVat(createVatDto: CreateVatDto) {
    return this.systemClient.send({ cmd: 'create-vat' }, createVatDto);
  }

  async updateVat(id: string, updateVatDto: UpdateVatDto) {
    return this.systemClient.send(
      { cmd: 'update-vat' },
      { ...updateVatDto, vat_id: id },
    );
  }

  async sendDeleteVats(datas: string[]) {
    return await firstValueFrom(this.systemClient.send('delete-vats', datas));
  }
  async createUnitProduct(createUnitDto: CreateUnitProductDto) {
    return this.systemClient.send(
      { cmd: 'create-unit_product' },
      createUnitDto,
    );
  }

  async updateUnitProduct(updateUnitDto: UpdateUnitProductDto) {
    return this.systemClient.send(
      { cmd: 'update-unit_product' },
      updateUnitDto,
    );
  }

  async createVats(createVatsDto: CreateVatDto[]) {
    return this.systemClient.send({ cmd: 'create-vats' }, createVatsDto);
  }

  async createProfits(createProfitsDto: CreateProfitDto[]) {
    return this.systemClient.send({ cmd: 'create-profits' }, createProfitsDto);
  }

  async createProfit(createProfitDto: CreateProfitDto) {
    return this.systemClient.send({ cmd: 'create-profit' }, createProfitDto);
  }

  async sendDeleteProfits(datas: string[]) {
    return await firstValueFrom(
      this.systemClient.send('delete-profits', datas),
    );
  }

  async updateProvince(updateProvinceDto: UpdateProvinceDto) {
    return this.systemClient.send(
      { cmd: 'update-province' },
      updateProvinceDto,
    );
  }

  async updateProfit(updateProfitDto: UpdateProfitDto) {
    return this.systemClient.send({ cmd: 'update-profit' }, updateProfitDto);
  }

  async getAllProvinces(): Promise<{
    statusCode: number;
    data: GetProvinceDto[];
  }> {
    return {
      statusCode: HttpStatus.OK,
      data: await firstValueFrom(
        this.systemClient.send<GetProvinceDto[]>({ cmd: 'get-provinces' }, {}),
      ),
    };
  }

  async getAllVats() {
    return {
      statusCode: HttpStatus.OK,
      data: await firstValueFrom(
        this.systemClient.send({ cmd: 'get-vats' }, {}),
      ),
    };
  }

  async getAllVat() {
    return {
      statusCode: HttpStatus.OK,
      data: await firstValueFrom(
        this.systemClient.send({ cmd: 'get-all_vat' }, {}),
      ),
    };
  }

  async getVat(id: string) {
    return await firstValueFrom(this.systemClient.send({ cmd: 'get-vat' }, id));
  }

  async getAllProfits() {
    return {
      statusCode: HttpStatus.OK,
      data: await firstValueFrom(
        this.systemClient.send({ cmd: 'get-profits' }, {}),
      ),
    };
  }

  async getProfit(id: string) {
    return await firstValueFrom(
      this.systemClient.send({ cmd: 'get-profit' }, id),
    );
  }

  async getProvinceById(provinceId: string) {
    return this.systemClient.send({ cmd: 'get-province_by_id' }, provinceId);
  }

  async deleteProvince(provinceId: string) {
    return this.systemClient.send({ cmd: 'delete-province' }, provinceId);
  }

  // Product methods
  async createProduct(createProductDto: CreateProductDto) {
    //console.log('vo');
    return this.systemClient.send({ cmd: 'create-product' }, createProductDto);
  }

  async updateProduct(updateProductDto: UpdateProductDto) {
    return this.systemClient.send({ cmd: 'update-product' }, updateProductDto);
  }

  async getAllProducts() {
    return this.systemClient.send({ cmd: 'get-all_products' }, {});
  }

  async getProductById(productId: string) {
    return this.systemClient.send({ cmd: 'get-product_by_id' }, productId);
  }

  async deleteProduct(productId: string) {
    return this.systemClient.send({ cmd: 'delete-product' }, productId);
  }

  // Picture Product methods
  async createPictureProduct(createPictureProductDto: CreatePictureProductDto) {
    return this.systemClient.send(
      { cmd: 'create-picture_product' },
      createPictureProductDto,
    );
  }

  async updatePictureProduct(updatePictureProductDto: UpdatePictureProductDto) {
    return this.systemClient.send(
      { cmd: 'update-picture_product' },
      updatePictureProductDto,
    );
  }

  async getAllPictureProducts() {
    return this.systemClient.send({ cmd: 'get-all_picture_products' }, {});
  }

  async getPictureProductById(pictureId: string) {
    return this.systemClient.send(
      { cmd: 'get-picture_product_by_id' },
      pictureId,
    );
  }

  async deletePictureProduct(pictureId: string) {
    return this.systemClient.send({ cmd: 'delete-picture_product' }, pictureId);
  }

  // List Use Product methods
  async createListUseProduct(createListUseProductDto: CreateListUseProductDto) {
    return this.systemClient.send(
      { cmd: 'create-list_use_product' },
      createListUseProductDto,
    );
  }

  async updateListUseProduct(updateListUseProductDto: UpdateListUseProductDto) {
    return this.systemClient.send(
      { cmd: 'update-list_use_product' },
      updateListUseProductDto,
    );
  }

  async getAllListUseProducts() {
    return this.systemClient.send({ cmd: 'get-all_list_use_products' }, {});
  }

  async getListUseProductById(useId: string) {
    return this.systemClient.send({ cmd: 'get-list_use_product_by_id' }, useId);
  }

  async deleteListUseProduct(useId: string) {
    return this.systemClient.send({ cmd: 'delete-list_use_product' }, useId);
  }

  async getListProductType(type_id: string) {
    return this.systemClient.send({ cmd: 'get-list_product_type_id' }, type_id);
  }

  async createTarget(createTarget: CreateTargetRevenueDto) {
    return this.systemClient.send(
      { cmd: 'create-target_revenue' },
      createTarget,
    );
  }

  async updateTarget(id: string, updateTarget: UpdateTargetRevenueDto) {
    return this.systemClient.send(
      { cmd: 'update-target_revenue' },
      { id, data: updateTarget },
    );
  }

  async getTarget(id: string) {
    return this.systemClient.send({ cmd: 'get-target_revenue' }, id);
  }

  async getTargetYear() {
    return this.systemClient.send({ cmd: 'get-target_revenue_year' }, {});
  }

  async getAllTarget() {
    return this.systemClient.send({ cmd: 'get-all_target_revenue' }, {});
  }
}
