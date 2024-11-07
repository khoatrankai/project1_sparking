import {  Body, Controller, Delete, Get,  Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/ProductDto/create-product.dto';
import { UpdateProductDto } from './dto/ProductDto/update-product.dto';
import { CreateCodeProductDto } from './dto/CodeProductDto/create-code_product.dto';
import { UpdateCodeProductDto } from './dto/CodeProductDto/update-code_product.dto';
import { CreatePictureProductDto } from './dto/PictureProductDto/create-picture_product.dto';
import { CreateTypeProductDto } from './dto/TypeProductDto/create-type_product.dto';
import { UpdatePictureProductDto } from './dto/PictureProductDto/update-picture_product.dto';
import { UpdateTypeProductDto } from './dto/TypeProductDto/update-type_product.dto';
import { CreateUnitProductDto } from './dto/UnitProductDto/create-unit_product.dto';
import { UpdateUnitProductDto } from './dto/UnitProductDto/update-unit_product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';




@Controller('product')
export class ProductController {
 
  constructor(private readonly productService: ProductService) {
    
  }

  @Get()
  getHello(): string {
    return this.productService.getHello();
  }


  @Get('about')
  getAbout() {
    return this.productService.getAboutProduct();
  }
  
  @Post('new')
  @UseInterceptors(FilesInterceptor('images',5))
  async createProduct(@Body() createProductDto:CreateProductDto,@UploadedFiles() images:Express.Multer.File[]) {
    return this.productService.createProduct(createProductDto,images);
  }

  @Put('id/:id')
  @UseInterceptors(FilesInterceptor('images',5))
  async updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@UploadedFiles() images:Express.Multer.File[]) {
    return this.productService.updateProduct(id, updateProductDto,images);
  }

  @Put('/status/id/:id')
  async updateStatusProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateStatusProduct(id, updateProductDto);
  }


  @Get('all')
  async findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Get('id/:id')
  async findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }



  // CodeProduct endpoints
  @Post('code')
  async createCodeProduct(@Body() createCodeProductDto: CreateCodeProductDto) {
    return this.productService.createCodeProduct(createCodeProductDto);
  }

  @Get('code')
  async findAllCodeProduct() {
    return this.productService.findAllCodeProduct();
  }

  @Get('code/all/:id')
  async findAllCodeProductID(@Param('id') id: string) {
    return this.productService.findAllCodeProductID(id);
  }

  @Get('code/:id')
  async findOneCodeProduct(@Param('id') id: string) {
    return this.productService.findOneCodeProduct(id);
  }

  @Put('code/:id')
  async updateCodeProduct(@Param('id') id: string, @Body() updateCodeProductDto: UpdateCodeProductDto) {
    return this.productService.updateCodeProduct(id, updateCodeProductDto);
  }

  // PictureProduct endpoints
  @Post('picture')
  async createPictureProduct(@Body() createPictureProductDto: CreatePictureProductDto) {
    return this.productService.createPictureProduct(createPictureProductDto);
  }

  @Get('picture')
  async findAllPictureProduct() {
    return this.productService.findAllPictureProduct();
  }

  @Get('picture/:id')
  async findOnePictureProduct(@Param('id') id: string) {
    return this.productService.findOnePictureProduct(id);
  }

  @Put('picture/:id')
  async updatePictureProduct(@Param('id') id: string, @Body() updatePictureProductDto: UpdatePictureProductDto) {
    return this.productService.updatePictureProduct(id, updatePictureProductDto);
  }

  @Delete('picture')
  async deletePictureProduct( @Body() data:string[]) {
    return this.productService.deletePictureProduct(data);
  }

  // TypeProduct endpoints
  @Post('type')
  async createTypeProduct(@Body() createTypeProductDto: CreateTypeProductDto) {
    return this.productService.createTypeProduct(createTypeProductDto);
  }

  @Get('type')
  async findAllTypeProduct() {
    return this.productService.findAllTypeProduct();
  }

  @Get('type/:id')
  async findOneTypeProduct(@Param('id') id: string) {
    return this.productService.findOneTypeProduct(id);
  }

  @Put('type/:id')
  async updateTypeProduct(@Param('id') id: string, @Body() updateTypeProductDto: UpdateTypeProductDto) {
    return this.productService.updateTypeProduct(id, updateTypeProductDto);
  }

  // UnitProduct endpoints
  @Post('unit')
  async createUnitProduct(@Body() createUnitProductDto: CreateUnitProductDto) {
    return this.productService.createUnitProduct(createUnitProductDto);
  }

  @Get('unit')
  async findAllUnitProduct() {
    return this.productService.findAllUnitProduct();
  }

  @Get('unit/:id')
  async findOneUnitProduct(@Param('id') id: string) {
    return this.productService.findOneUnitProduct(id);
  }

  @Put('unit/:id')
  async updateUnitProduct(@Param('id') id: string, @Body() updateUnitProductDto: UpdateUnitProductDto) {
    return this.productService.updateUnitProduct(id, updateUnitProductDto);
  }
 

  
}
