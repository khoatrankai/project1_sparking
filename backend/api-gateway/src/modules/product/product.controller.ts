import {  Body, Controller, Delete, Get,  Param, Post, Put, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
import { UpdateSupplierProductDto } from './dto/SupplierProductDto/update-supplier_product.dto';
import { CreateSupplierProductDto } from './dto/SupplierProductDto/create-supplier_product.dto';
import { CreateActivityContainerDto } from './dto/ActivityContainerDto/create-activity_container.dto';
import { UpdateActivityContainerDto } from './dto/ActivityContainerDto/update-activity_container.dto';
import { CreateBrandDto } from './dto/BrandDto/create-brand.dto';
import { UpdateBrandDto } from './dto/BrandDto/update-brand.dto';
import { CreateOriginalDto } from './dto/OriginalDto/create-original.dto';
import { UpdateOriginalDto } from './dto/OriginalDto/update-original.dto';
import { Request } from 'express';




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

  @Get('code_url')
  async findOneUrlCodeProduct(@Query('url') url: string) {
    return this.productService.findOneUrlCodeProduct(url);
  }

  
  @Get('code_client')
  async findOneClientCodeProduct(@Req() req:Request) {
    const linkClient = req.headers.origin
    return this.productService.findOneUrlCodeProduct(linkClient);
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


  @Post('brand')
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.productService.createBrand(createBrandDto);
  }

  @Get('brand')
  async findAllBrand() {
    return this.productService.findAllBrand();
  }

  @Get('brand/:id')
  async findOneBrand(@Param('id') id: string) {
    return this.productService.findOneBrand(id);
  }

  @Put('brand/:id')
  async updateBrand(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.productService.updateBrand(id, updateBrandDto);
  }

  @Post('original')
  async createOriginal(@Body() createOriginalDto: CreateOriginalDto) {
    return this.productService.createOriginal(createOriginalDto);
  }

  @Get('original')
  async findAllOriginal() {
    return this.productService.findAllOriginal();
  }

  @Get('original/:id')
  async findOneOriginal(@Param('id') id: string) {
    return this.productService.findOneOriginal(id);
  }

  @Put('original/:id')
  async updateOriginal(@Param('id') id: string, @Body() updateOriginalDto: UpdateOriginalDto) {
    return this.productService.updateOriginal(id, updateOriginalDto);
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
 
  @Post('supplier')
async createSupplierProduct(@Body() createSupplierProductDto: CreateSupplierProductDto) {
  return this.productService.createSupplierProduct(createSupplierProductDto);
}

@Get('supplier')
async findAllSupplierProduct() {
  return this.productService.findAllSupplierProduct();
}

@Get('supplier/:id')
async findOneSupplierProduct(@Param('id') id: string) {
  return this.productService.findOneSupplierProduct(id);
}

@Put('supplier/:id')
async updateSupplierProduct(@Param('id') id: string, @Body() updateSupplierProductDto: UpdateSupplierProductDto) {
  return this.productService.updateSupplierProduct(id, updateSupplierProductDto);
}

@Post('activity_container')
  async createActivityContainer(@Body() createActivityContainerDto: CreateActivityContainerDto) {
    return this.productService.createActivityContainer(createActivityContainerDto);
  }

  @Get('activity_container')
  async findAllActivityContainers(@Query('type') type:string) {
    return this.productService.findAllActivityContainers(type);
  }

  @Get('activity_container/:id')
  async findActivityContainerById(@Param('id') id: string) {
    return this.productService.findActivityContainerById(id);
  }

  @Put('activity_container/:id')
  async updateActivityContainer(
    @Param('id') id: string,
    @Body() updateActivityContainerDto: UpdateActivityContainerDto,
  ) {
    return this.productService.updateActivityContainer(id, updateActivityContainerDto);
  }
}
