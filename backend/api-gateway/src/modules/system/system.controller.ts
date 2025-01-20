import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateProductDto } from './dto/create_product.dto';
import { CreateListUseProductDto } from './dto/create_list_user_product.dto';
import { CreateProvinceDto } from './dto/create_province.dto';
import { CreateVatDto } from './dto/create_vat.dto';
import { CreateProfitDto } from './dto/create_profit.dto';
import { CreateLinkSystemDto } from './dto/create_link_system.dto';
import { UpdateVatDto } from './dto/update_vat.dto';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHello(): string {
    return this.systemService.getHello();
  }

  @Get('list-product-type')
  getListProductType(@Query() type_id: string) {
    return this.systemService.getListProductType(type_id);
  }

  @Post('product')
  createProduct(@Body() dataProduct: CreateProductDto) {
    return this.systemService.createProduct(dataProduct);
  }

  @Post('list-use-product')
  createListUseProduct(@Body() dataListUseProduct: CreateListUseProductDto) {
    return this.systemService.createListUseProduct(dataListUseProduct);
  }

  @Post('create-provinces')
  createProvinces(@Body() dataProvinces: CreateProvinceDto[]) {
    return this.systemService.createProvinces(dataProvinces);
  }

  @Delete('province')
  async sendDeleteProvinces(@Body() datas: string[]) {
    return this.systemService.sendDeleteProvince(datas);
  }
  @Get('provinces')
  getProvinces() {
    return this.systemService.getAllProvinces();
  }

  @Post('create-links_system')
  createLinksSystem(@Body() dataLinksSystem: CreateLinkSystemDto[]) {
    return this.systemService.createLinksSystem(dataLinksSystem);
  }
  @Get('link/:name_tag')
  getLinkSystem(@Param('name_tag') name_tag: string) {
    return this.systemService.getLinkSystemByNameTag(name_tag);
  }

  @Post('create-vats')
  createVats(@Body() dataVats: CreateVatDto[]) {
    return this.systemService.createVats(dataVats);
  }

  @Post('create-vat')
  createVat(@Body() dataVats: CreateVatDto) {
    return this.systemService.createVat(dataVats);
  }

  @Put('update-vat/:id')
  updateVat(@Param('id') id: string, @Body() dataVats: UpdateVatDto) {
    return this.systemService.updateVat(id, dataVats);
  }

  @Delete('vats')
  async sendDeleteVats(@Body() datas: string[]) {
    return this.systemService.sendDeleteVats(datas);
  }

  @Get('vats')
  getVats() {
    return this.systemService.getAllVats();
  }

  @Get('vat/:id')
  getVat(@Param('id') id: string) {
    return this.systemService.getVat(id);
  }

  @Get('all')
  getAllVat() {
    return this.systemService.getAllVat();
  }

  @Post('create-profits')
  createProfits(@Body() dataProfits: CreateProfitDto[]) {
    return this.systemService.createProfits(dataProfits);
  }

  @Delete('profits')
  async sendDeleteProfits(@Body() datas: string[]) {
    return this.systemService.sendDeleteProfits(datas);
  }

  @Get('profits')
  getProfits() {
    return this.systemService.getAllProfits();
  }
}
