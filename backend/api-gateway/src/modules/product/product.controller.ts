import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  SetMetadata,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
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
import { UpdateClassifyTypeDto } from './dto/ClassifyTypeDto/update-classify_type.dto';
import { CreateClassifyTypeDto } from './dto/ClassifyTypeDto/create-classify_type.dto';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getHello(): string {
    return this.productService.getHello();
  }

  @Get('about')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  getAbout() {
    return this.productService.getAboutProduct();
  }

  @Post('new')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('images', 5))
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productService.createProduct(createProductDto, images);
  }

  @Delete()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteProduct(@Body() datas: string[]) {
    return this.productService.sendDeleteProduct(datas);
  }

  @Put('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  @UseInterceptors(FilesInterceptor('images', 5))
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ) {
    return this.productService.updateProduct(id, updateProductDto, images);
  }

  @Put('/status/id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateStatusProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateStatusProduct(id, updateProductDto);
  }

  @Get('all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'price_quote', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllProduct() {
    return this.productService.findAllProduct();
  }

  @Get('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneProduct(@Param('id') id: string) {
    return this.productService.findOneProduct(id);
  }

  // CodeProduct endpoints
  @Post('code')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createCodeProduct(@Body() createCodeProductDto: CreateCodeProductDto) {
    return this.productService.createCodeProduct(createCodeProductDto);
  }

  @Get('code')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllCodeProduct() {
    return this.productService.findAllCodeProduct();
  }

  @Get('code/all/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllCodeProductID(@Param('id') id: string) {
    return this.productService.findAllCodeProductID(id);
  }

  @Get('code/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneCodeProduct(@Param('id') id: string) {
    return this.productService.findOneCodeProduct(id);
  }

  @Get('code_url')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneUrlCodeProduct(@Query('url') url: string) {
    return this.productService.findOneUrlCodeProduct(url);
  }

  @Get('code_client')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneClientCodeProduct(@Req() req: Request) {
    const linkClient = req.headers.origin;
    return this.productService.findOneUrlCodeProduct(linkClient);
  }

  @Put('code/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateCodeProduct(
    @Param('id') id: string,
    @Body() updateCodeProductDto: UpdateCodeProductDto,
  ) {
    return this.productService.updateCodeProduct(id, updateCodeProductDto);
  }

  // PictureProduct endpoints
  @Post('picture')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createPictureProduct(
    @Body() createPictureProductDto: CreatePictureProductDto,
  ) {
    return this.productService.createPictureProduct(createPictureProductDto);
  }

  @Get('picture')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllPictureProduct() {
    return this.productService.findAllPictureProduct();
  }

  @Get('picture/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOnePictureProduct(@Param('id') id: string) {
    return this.productService.findOnePictureProduct(id);
  }

  @Put('picture/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updatePictureProduct(
    @Param('id') id: string,
    @Body() updatePictureProductDto: UpdatePictureProductDto,
  ) {
    return this.productService.updatePictureProduct(
      id,
      updatePictureProductDto,
    );
  }

  @Delete('picture')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async deletePictureProduct(@Body() data: string[]) {
    return this.productService.deletePictureProduct(data);
  }

  // TypeProduct endpoints
  @Post('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createTypeProduct(@Body() createTypeProductDto: CreateTypeProductDto) {
    return this.productService.createTypeProduct(createTypeProductDto);
  }

  @Get('type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllTypeProduct() {
    return this.productService.findAllTypeProduct();
  }

  @Get('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneTypeProduct(@Param('id') id: string) {
    return this.productService.findOneTypeProduct(id);
  }

  @Put('type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateTypeProduct(
    @Param('id') id: string,
    @Body() updateTypeProductDto: UpdateTypeProductDto,
  ) {
    console.log(updateTypeProductDto);
    return this.productService.updateTypeProduct(id, updateTypeProductDto);
  }

  @Post('classify_type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createClassifyType(
    @Body() createClassifyTypeDto: CreateClassifyTypeDto,
  ) {
    return this.productService.createClassifyType(createClassifyTypeDto);
  }

  @Get('classify_type')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllClassifyType() {
    return this.productService.findAllClassifyType();
  }

  @Get('classify_type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneClassifyType(@Param('id') id: string) {
    return this.productService.findOneClassifyType(id);
  }

  @Get('classify_type_name/:name')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneClassifyTypeName(@Param('name') name: string) {
    return this.productService.findOneClassifyTypeName(name);
  }

  @Put('classify_type/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateClassifyType(
    @Param('id') id: string,
    @Body() updateClassifyTypeDto: UpdateClassifyTypeDto,
  ) {
    return this.productService.updateClassifyType(id, updateClassifyTypeDto);
  }

  @Post('brand')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.productService.createBrand(createBrandDto);
  }

  @Delete('brand')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteBrand(@Body() datas: string[]) {
    return this.productService.sendDeleteBrand(datas);
  }

  @Get('brand')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllBrand() {
    return this.productService.findAllBrand();
  }

  @Get('brand/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneBrand(@Param('id') id: string) {
    return this.productService.findOneBrand(id);
  }

  @Put('brand/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    return this.productService.updateBrand(id, updateBrandDto);
  }

  @Post('original')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createOriginal(@Body() createOriginalDto: CreateOriginalDto) {
    return this.productService.createOriginal(createOriginalDto);
  }

  @Delete('original')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteOriginal(@Body() datas: string[]) {
    return this.productService.sendDeleteOriginal(datas);
  }

  @Get('original')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllOriginal() {
    return this.productService.findAllOriginal();
  }

  @Get('original/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneOriginal(@Param('id') id: string) {
    return this.productService.findOneOriginal(id);
  }

  @Put('original/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateOriginal(
    @Param('id') id: string,
    @Body() updateOriginalDto: UpdateOriginalDto,
  ) {
    return this.productService.updateOriginal(id, updateOriginalDto);
  }

  // UnitProduct endpoints
  @Post('unit')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createUnitProduct(@Body() createUnitProductDto: CreateUnitProductDto) {
    return this.productService.createUnitProduct(createUnitProductDto);
  }

  @Delete('unit')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteUnitProduct(@Body() datas: string[]) {
    return this.productService.sendDeleteUnitProduct(datas);
  }

  @Get('unit')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'price_quote', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllUnitProduct() {
    return this.productService.findAllUnitProduct();
  }

  @Get('unit/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneUnitProduct(@Param('id') id: string) {
    return this.productService.findOneUnitProduct(id);
  }

  @Put('unit/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateUnitProduct(
    @Param('id') id: string,
    @Body() updateUnitProductDto: UpdateUnitProductDto,
  ) {
    return this.productService.updateUnitProduct(id, updateUnitProductDto);
  }

  @Post('supplier')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createSupplierProduct(
    @Body() createSupplierProductDto: CreateSupplierProductDto,
  ) {
    return this.productService.createSupplierProduct(createSupplierProductDto);
  }

  @Post('suppliers')
  async createSuppliersProduct(
    @Body() createSupplierProductDto: CreateSupplierProductDto[],
  ) {
    return this.productService.createSuppliersProduct(createSupplierProductDto);
  }

  @Delete('supplier')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteSupplierProduct(@Body() datas: string[]) {
    return this.productService.sendDeleteSupplierProduct(datas);
  }

  @Get('supplier')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllSupplierProduct() {
    return this.productService.findAllSupplierProduct();
  }

  @Get('supplier/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findOneSupplierProduct(@Param('id') id: string) {
    return this.productService.findOneSupplierProduct(id);
  }

  @Put('supplier/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateSupplierProduct(
    @Param('id') id: string,
    @Body() updateSupplierProductDto: UpdateSupplierProductDto,
  ) {
    return this.productService.updateSupplierProduct(
      id,
      updateSupplierProductDto,
    );
  }

  @Post('activity_container')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async createActivityContainer(
    @Body() createActivityContainerDto: CreateActivityContainerDto,
  ) {
    return this.productService.createActivityContainer(
      createActivityContainerDto,
    );
  }

  @Delete('activity_container')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async sendDeleteActivityContainer(@Body() datas: string[]) {
    return this.productService.sendDeleteActivityContainer(datas);
  }

  @Get('activity_container')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findAllActivityContainers(@Query('type') type: string) {
    return this.productService.findAllActivityContainers(type);
  }

  @Get('activity_container/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async findActivityContainerById(@Param('id') id: string) {
    return this.productService.findActivityContainerById(id);
  }

  @Put('activity_container/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['product', 'admin-top'])
  @SetMetadata('type', ['admin'])
  async updateActivityContainer(
    @Param('id') id: string,
    @Body() updateActivityContainerDto: UpdateActivityContainerDto,
  ) {
    return this.productService.updateActivityContainer(
      id,
      updateActivityContainerDto,
    );
  }
}
