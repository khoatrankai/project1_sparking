import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { SystemService } from './system.service';
import { CreateLabelDto } from 'src/dto/label/create_label.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUnitProductDto } from 'src/dto/create_unit_product.dto copy';
import { UpdateUnitProductDto } from 'src/dto/update_unit_product.dto';
import { UpdateProductDto } from 'src/dto/update_product.dto';
import { CreateProductDto } from 'src/dto/create_product.dto';
import { CreateListUseProductDto } from 'src/dto/create_list_user_product.dto';
import { CreateProvinceDto } from 'src/dto/create_province.dto';
import { CreateVatDto } from 'src/dto/create_vat.dto';
import { CreateProfitDto } from 'src/dto/create_profit.dto';

@Controller('/system')
@UseFilters(ConflictExceptionFilter)
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHello(): string {
    return this.systemService.getHello();
  }

  @MessagePattern({ cmd: 'create-label' })
  createLabel(@Payload() createLabelDto: CreateLabelDto) {
    return this.systemService.createLabel(createLabelDto);
  }

  @MessagePattern({ cmd: 'delete-label' })
  deleteLabel(@Payload() deleteLabelDto: string) {
    return this.systemService.deleteLabel(deleteLabelDto);
  }

  @MessagePattern({ cmd: 'create-unit_product' })
  createTypeProduct(@Payload() createTypeProductDto: CreateUnitProductDto) {
    return this.systemService.createUnitProduct(createTypeProductDto);
  }

  @MessagePattern({ cmd: 'create-provinces' })
  createProvinces(@Payload() createProvincesDto: CreateProvinceDto[]) {
    console.log("goi toi")
    return this.systemService.createProvinces(createProvincesDto);
  }

  @MessagePattern({ cmd: 'get-provinces' })
  getProvinces() {
    return this.systemService.getAllProvinces();
  }

  @MessagePattern({ cmd: 'update-unit_product' })
  updateTypeProduct(@Payload() updateTypeProductDto: UpdateUnitProductDto) {
    return this.systemService.updateUnitProduct(updateTypeProductDto);
  }

  @MessagePattern({ cmd: 'create-vats' })
  createVats(@Payload() createVats: CreateVatDto[]) {
    console.log("goi toi")
    return this.systemService.createVats(createVats);
  }

  @MessagePattern({ cmd: 'get-vats' })
  getVats() {
    return this.systemService.getAllVats();
  }

  @MessagePattern({ cmd: 'create-profits' })
  createProfits(@Payload() createProfits: CreateProfitDto[]) {
    return this.systemService.createProfits(createProfits);
  }

  @MessagePattern({ cmd: 'get-profits' })
  getProfits() {
    return this.systemService.getAllProfits();
  }

  @MessagePattern({ cmd: 'get-profit_ids' })
  getProfitIds(profit_ids:string[]) {
    return this.systemService.getProfitIDs(profit_ids);
  }

  @MessagePattern({ cmd: 'get-province_id' })
  getProfitId(profit_id:string) {
    return this.systemService.getProvinceById(profit_id);
  }


  @MessagePattern({ cmd: 'get-all_unit_products' })
  getAllTypeProducts() {
    return this.systemService.getAllUnitProducts();
  }

  @MessagePattern({ cmd: 'get-unit_product_by_id' })
  getTypeProductById(@Payload() type_id: string) {
    return this.systemService.getUnitProductById(type_id);
  }

  @MessagePattern({ cmd: 'delete-unit_product' })
  deleteTypeProduct(@Payload() type_id: string) {
    return this.systemService.deleteUnitProduct(type_id);
  }

  @MessagePattern({ cmd: 'create-product' })
  createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.systemService.createProduct(createProductDto);
  }

  @MessagePattern({ cmd: 'update-product' })
  updateProduct(@Payload() updateProductDto: UpdateProductDto) {
    return this.systemService.updateProduct(updateProductDto);
  }

  @MessagePattern({ cmd: 'get-all_products' })
  getAllProducts() {
    return this.systemService.getAllProducts();
  }

  @MessagePattern({ cmd: 'get-product_by_id' })
  getProductById(@Payload() product_id: string) {
    return this.systemService.getProductById(product_id);
  }

  @MessagePattern({ cmd: 'delete-product' })
  deleteProduct(@Payload() product_id: string) {
    return this.systemService.deleteProduct(product_id);
  }

  @MessagePattern({ cmd: 'create-list_use_product' })
  createListUseProduct(@Payload() dataListUseProduct: CreateListUseProductDto) {
    return this.systemService.createListUseProduct(dataListUseProduct);
  }

  @MessagePattern({ cmd: 'get-list_product_type_id' })
  getListProductTypeId(@Payload() data) {
    return this.systemService.getListProductType(data);
  }
  
}
