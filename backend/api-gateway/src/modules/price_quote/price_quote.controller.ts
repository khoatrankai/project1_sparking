import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
// import { PriceQuetoService } from './price_queto.service';
import { PriceQuoteService } from './price_quote.service';
import { CreatePriceQuoteDto } from './dto/PriceQuoteDto/create_price_quote.dto';
import { UpdatePriceQuoteDto } from './dto/PriceQuoteDto/update_price_quote.dto';
import { PriceQuoteFilterDto } from './dto/PriceQuoteDto/get_filter_price_quote.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { CreateTypePackageDto } from './dto/TypePackageDto/create_type_package.dto';
import { UpdateTypePackageDto } from './dto/TypePackageDto/update_type_package.dto';

@Controller('price_quote')
export class PriceQuoteController {
  constructor(private readonly priceQuetoService: PriceQuoteService) {}

  @Get()
  getHello() {
    return this.priceQuetoService.getHello();
  }

  @Get('all')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-read'])
  @SetMetadata('type', ['admin'])
  getAll(@Query() filter?: PriceQuoteFilterDto) {
    return this.priceQuetoService.sendGetPriceQueto(filter);
  }

  @Get('dashboard')
  @UseGuards(RoleGuard)
  @SetMetadata('checkfull', ['all'])
  findFullTypePackageYear() {
    return this.priceQuetoService.sendFindFullTypePackageYear();
  }

  @Get('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-read'])
  @SetMetadata('type', ['admin'])
  getOne(@Param() data: { id: string }) {
    return this.priceQuetoService.sendGetPriceQuetoID(data.id);
  }

  @Get('export/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-read'])
  @SetMetadata('type', ['admin'])
  getOneExport(@Param() data: { id: string }) {
    return this.priceQuetoService.exportExcelPriceQuote(data.id);
  }

  @Post()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async createPriceQuote(@Body() createPriceQuoteDto: CreatePriceQuoteDto) {
    // console.log(createPriceQuoteDto.parts[0].price_quotes[0].list_detail)
    return this.priceQuetoService.sendCreatePriceQueto(createPriceQuoteDto);
  }

  @Delete()
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeletePriceQuote(@Body() datas: string[]) {
    return this.priceQuetoService.sendDeletePriceQueto(datas);
  }

  @Put('id/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async updatePriceQuote(
    @Param('id') id: string,
    @Body() updatePriceQuoteDto: UpdatePriceQuoteDto,
  ) {
    return this.priceQuetoService.sendUpdatePriceQueto(id, updatePriceQuoteDto);
  }

  @Put('list')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async updateStatusPriceQuote(
    @Body() updatePriceQuoteDto: { price_quote_id: string; status: string }[],
  ) {
    return this.priceQuetoService.sendUpdateStatusPriceQueto(
      updatePriceQuoteDto,
    );
  }

  @Post('type-package')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async createTypePackage(@Body() createTypePackageDto: CreateTypePackageDto) {
    return this.priceQuetoService.createTypePackage(createTypePackageDto);
  }

  @Delete('type-package')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async sendDeleteTypePackage(@Body() datas: string[]) {
    return this.priceQuetoService.sendDeleteTypePackage(datas);
  }

  @Get('type-package')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-read'])
  @SetMetadata('type', ['admin'])
  async findAllTypePackage() {
    return this.priceQuetoService.findAllTypePackage();
  }

  @Get('type-package/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-read'])
  @SetMetadata('type', ['admin'])
  async findOneTypePackage(@Param('id') id: string) {
    return this.priceQuetoService.findOneTypePackage(id);
  }

  @Get('revenue-by-name')
  // @UseGuards(RoleGuard)
  // @SetMetadata('roles', ['price_quote', 'admin-top'])
  // @SetMetadata('type', ['admin'])
  async getFullRevenueByName(@Query('name') name: string) {
    return this.priceQuetoService.sendGetFullRevenueByName(name);
  }

  @Put('type-package/:id')
  @UseGuards(RoleGuard)
  @SetMetadata('roles', ['price_quote', 'admin-top', 'price_quote-edit'])
  @SetMetadata('type', ['admin'])
  async updateTypePackage(
    @Param('id') id: string,
    @Body() updateTypePackageDto: UpdateTypePackageDto,
  ) {
    return this.priceQuetoService.updateTypePackage(id, updateTypePackageDto);
  }

  // @Get('get-filter')
  // async getFilterPriceQuote(@Query() getFilterPriceQuoteDto: GetFilterPriceQuoteDto) {
  //   return this.priceQuetoService.sendGetFilterPriceQuote(getFilterPriceQuoteDto);
  // }
}
