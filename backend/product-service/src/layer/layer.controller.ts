import { Controller, Get, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { LayerService } from './layer.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from 'src/dto/ProductDto/create-product.dto';
import { CreateCodeProductDto } from 'src/dto/CodeProductDto/create-code_product.dto';
import { UpdateCodeProductDto } from 'src/dto/CodeProductDto/update-code_product.dto';
import { CreatePictureProductDto } from 'src/dto/PictureProductDto/create-picture_product.dto';
import { UpdatePictureProductDto } from 'src/dto/PictureProductDto/update-picture_product.dto';
import { UpdateProductDto } from 'src/dto/ProductDto/update-product.dto';
import { CreateTypeProductDto } from 'src/dto/TypeProductDto/create-type_product.dto';
import { UpdateTypeProductDto } from 'src/dto/TypeProductDto/update-type_product.dto';
import { CreateUnitProductDto } from 'src/dto/UnitProductDto/create-unit_product.dto';
import { UpdateUnitProductDto } from 'src/dto/UnitProductDto/update-unit_product.dto';
import { CreateSupplierProductDto } from 'src/dto/SupplierProductDto/create-supplier_product.dto';
import { UpdateSupplierProductDto } from 'src/dto/SupplierProductDto/update-supplier_product.dto';
import { CreateActivityContainerDto } from 'src/dto/ActivityContainerDto/create-activity_container.dto';
import { UpdateActivityContainerDto } from 'src/dto/ActivityContainerDto/update-activity_container.dto';



@Controller('/product')
@UseFilters(ConflictExceptionFilter)
export class LayerController {
  constructor(private readonly layerService: LayerService) {}

  @Get()
  getHello(): string {
    return this.layerService.getHello();
  }



  @MessagePattern({ cmd: 'get-about_product' })
  getAboutProduct() {
    return this.layerService.getAboutProduct();
  }

  @MessagePattern({ cmd: 'create-product' })
  async createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.layerService.createProduct(createProductDto);
  }

  @MessagePattern({ cmd: 'find-all_product' })
  async findAllProduct() {
    return this.layerService.findAllProduct();
  }

  @MessagePattern({ cmd: 'find-one_product' })
  async findOneProduct(@Payload() id: string) {
    return this.layerService.findOneProduct(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  async updateProduct(@Payload() data: { id: string; updateProductDto: UpdateProductDto }) {
    const { id, updateProductDto } = data;
    return this.layerService.updateProduct(id, updateProductDto);
  }

  @MessagePattern({ cmd: 'update-status_product' })
  async updateStatusProduct(@Payload() data: { id: string; updateProductDto: UpdateProductDto }) {
    const { id, updateProductDto } = data;
    return this.layerService.updateProduct(id, updateProductDto);
  }

  @MessagePattern({ cmd: 'create-code_product' })
  async createCodeProduct(@Payload() createCodeProductDto: CreateCodeProductDto) {
    return this.layerService.createCodeProduct(createCodeProductDto);
  }

  @MessagePattern({ cmd: 'find-all_code_product' })
  async findAllCodeProduct() {
    return this.layerService.findAllCodeProduct();
  }

  @MessagePattern({ cmd: 'find-all_code_product_id' })
  async findAllCodeProductID(@Payload() id: string) {
    return this.layerService.findAllCodeProductID(id);
  }

  @MessagePattern({ cmd: 'find-one_code_product' })
  async findOneCodeProduct(@Payload() id: string) {
    return this.layerService.findOneCodeProduct(id);
  }

  @MessagePattern({ cmd: 'update-code_product' })
  async updateCodeProduct(@Payload() data: { id: string; updateCodeProductDto: UpdateCodeProductDto }) {
    const { id, updateCodeProductDto } = data;
    return this.layerService.updateCodeProduct(id, updateCodeProductDto);
  }

  // @MessagePattern({ cmd: 'create-picture_product' })
  // async createPictureProduct(@Payload() createPictureProductDto: CreatePictureProductDto) {
  //   return this.layerService.createPictureProduct(createPictureProductDto);
  // }

  @MessagePattern({cmd:'get-product_ids'})
  getUserIDs(@Payload() product_ids:string[]){
    return this.layerService.getProductIDs(product_ids)
  }

  @MessagePattern({ cmd: 'create-pictures_product' })
  async createPicturesProduct(@Payload() createPictureProductDto: CreatePictureProductDto) {
    return this.layerService.createPicturesProduct(createPictureProductDto);
  }

  @MessagePattern({ cmd: 'find-all_picture_product' })
  async findAllPictureProduct() {
    return this.layerService.findAllPictureProduct();
  }

  @MessagePattern({ cmd: 'find-one_picture_product' })
  async findOnePictureProduct(@Payload() id: string) {
    return this.layerService.findOnePictureProduct(id);
  }

  @MessagePattern({ cmd: 'update-picture_product' })
  async updatePictureProduct(@Payload() data: { id: string; updatePictureProductDto: UpdatePictureProductDto }) {
    const { id, updatePictureProductDto } = data;
    return this.layerService.updatePictureProduct(id, updatePictureProductDto);
  }

  @MessagePattern({ cmd: 'delete-picture_product' })
  async deletePictureProduct(@Payload() id: string[]) {
    return this.layerService.deletePictureProduct(id);
  }

  @MessagePattern({ cmd: 'create-type_product' })
  async createTypeProduct(@Payload() createTypeProductDto: CreateTypeProductDto) {
    return this.layerService.createTypeProduct(createTypeProductDto);
  }

  @MessagePattern({ cmd: 'find-all_type_product' })
  async findAllTypeProduct() {
    return this.layerService.findAllTypeProduct();
  }

  @MessagePattern({ cmd: 'find-one_type_product' })
  async findOneTypeProduct(@Payload() id: string) {
    return this.layerService.findOneTypeProduct(id);
  }

  @MessagePattern({ cmd: 'update-type_product' })
  async updateTypeProduct(@Payload() data: { id: string; updateTypeProductDto: UpdateTypeProductDto }) {
    const { id, updateTypeProductDto } = data;
    return this.layerService.updateTypeProduct(id, updateTypeProductDto);
  }

  @MessagePattern({ cmd: 'create-unit_product' })
  async createUnitProduct(@Payload() createUnitProductDto: CreateUnitProductDto) {
    return this.layerService.createUnitProduct(createUnitProductDto);
  }

  @MessagePattern({ cmd: 'find-all_unit_product' })
  async findAllUnitProduct() {
    return this.layerService.findAllUnitProduct();
  }

  @MessagePattern({ cmd: 'find-one_unit_product' })
  async findOneUnitProduct(@Payload() id: string) {
    return this.layerService.findOneUnitProduct(id);
  }

  @MessagePattern({ cmd: 'update-unit_product' })
  async updateUnitProduct(@Payload() data: { id: string; updateUnitProductDto: UpdateUnitProductDto }) {
    const { id, updateUnitProductDto } = data;
    return this.layerService.updateUnitProduct(id, updateUnitProductDto);
  }
 
  @MessagePattern({ cmd: 'create-supplier_product' })
  async createSupplierProduct(@Payload() createSupplierProductDto: CreateSupplierProductDto) {
    return this.layerService.createSupplierProduct(createSupplierProductDto);
  }

  @MessagePattern({ cmd: 'find-all_supplier_product' })
  async findAllSupplierProducts() {
    return this.layerService.findAllSupplierProducts();
  }

  @MessagePattern({ cmd: 'find-one_supplier_product' })
  async findOneSupplierProduct(@Payload() id: string) {
    return this.layerService.findOneSupplierProduct(id);
  }

  @MessagePattern({ cmd: 'update-supplier_product' })
  async updateSupplierProduct(
    @Payload() data: { id: string; updateSupplierProductDto: UpdateSupplierProductDto },
  ) {
    const { id, updateSupplierProductDto } = data;
    return this.layerService.updateSupplierProduct(id, updateSupplierProductDto);
  }
  
  @MessagePattern({ cmd: 'create-activity_container' })
  async createActivityExportContainer(
    @Payload() createActivityContainerDto: CreateActivityContainerDto,
  ) {
    if(createActivityContainerDto.type === 'import'){
      return await this.layerService.createActivityImportContainer(createActivityContainerDto);
    }
    return await this.layerService.createActivityExportContainer(createActivityContainerDto);
  }


  @MessagePattern({ cmd: 'find-all_activity_containers' })
  async findAllActivityContainers(@Payload() data:{type:string}) {
    return await this.layerService.findAllActivityContainers(data.type);
  }

  @MessagePattern({ cmd: 'find-one_activity_container' })
  async findActivityContainerById(@Payload() id: string) {
    return await this.layerService.findActivityContainerById(id);
  }

  @MessagePattern({ cmd: 'update-activity_container' })
  async updateActivityContainer(
    @Payload()
    data: { id: string; updateActivityContainerDto: UpdateActivityContainerDto },
  ) {
    const { id, updateActivityContainerDto } = data;
    return await this.layerService.updateActivityContainer(id, updateActivityContainerDto);
  }
}
