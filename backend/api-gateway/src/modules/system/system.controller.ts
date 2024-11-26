import {  Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateProductDto } from './dto/create_product.dto';
import { CreateListUseProductDto } from './dto/create_list_user_product.dto';
import { CreateProvinceDto } from './dto/create_province.dto';
import { CreateVatDto } from './dto/create_vat.dto';
import { CreateProfitDto } from './dto/create_profit.dto';




@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHello(): string {
    return this.systemService.getHello();
  }

  @Get('list-product-type')
  getListProductType(@Query() type_id:string) {
    return this.systemService.getListProductType(type_id);
  }

  @Post('product')
  createProduct(@Body() dataProduct:CreateProductDto){
    return this.systemService.createProduct(dataProduct)
  }

  @Post('list-use-product')
  createListUseProduct(@Body() dataListUseProduct:CreateListUseProductDto){
    return this.systemService.createListUseProduct(dataListUseProduct)
  }
  @Post('create-provinces')
  createProvinces(@Body() dataProvinces:CreateProvinceDto[]){
    return this.systemService.createProvinces(dataProvinces)
  }
  @Get('provinces')
  getProvinces(){
    return this.systemService.getAllProvinces()
  }

  @Post('create-vats')
  createVats(@Body() dataVats:CreateVatDto[]){
    return this.systemService.createVats(dataVats)
  }
  @Get('vats')
  getVats(){
    return this.systemService.getAllVats()
  }

  @Post('create-profits')
  createProfits(@Body() dataProfits:CreateProfitDto[]){
    return this.systemService.createProfits(dataProfits)
  }
  @Get('profits')
  getProfits(){
    return this.systemService.getAllProfits()
  }

  
}
