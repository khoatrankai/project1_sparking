import {  Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ProposeService } from './propose.service';
import { CreateListProductDto } from './dto/ListProductDto/create_list_product.dto';
import { UpdateListProductDto } from './dto/ListProductDto/update_list_product.dto';
import { CreateProposeDto } from './dto/ProposeDto/create_propose.dto';
import { UpdateProposeDto } from './dto/ProposeDto/update_propose.dto';



@Controller('propose')
export class ProposeController {
  constructor(private readonly proposeService: ProposeService) {}

  @Get()
  getHello(): string {
    return this.proposeService.getHello();
  }
  @Post()
  async createPropose(@Body() createProposeDto: CreateProposeDto) {
    try {
      const result = await this.proposeService.createPropose(createProposeDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Propose created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Failed to create propose', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async findAllPropose() {
    try {
      const result = await this.proposeService.findAllPropose();
      return {
        statusCode: HttpStatus.OK,
        message: 'Proposes retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Failed to retrieve proposes', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('one/:id')
  async findOnePropose(@Param('id') id: string) {
    try {
      const result = await this.proposeService.findOnePropose(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Propose retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Propose not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put('update/:id')
  async updatePropose(
    @Param('id') id: string,
    @Body() updateProposeDto: UpdateProposeDto,
  ) {
    try {
      const result = await this.proposeService.updatePropose(id, updateProposeDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Propose updated successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Failed to update propose', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('list-products')
  async createListProduct(@Body() createListProductDto: CreateListProductDto) {
    try {
      const result = await this.proposeService.createListProduct(createListProductDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'List product created successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Failed to create list product', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list-products')
  async findAllListProduct() {
    try {
      const result = await this.proposeService.findAllListProduct();
      return {
        statusCode: HttpStatus.OK,
        message: 'List products retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Failed to retrieve list products', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('list-products/:id')
  async findOneListProduct(@Param('id') id: string) {
    try {
      const result = await this.proposeService.findOneListProduct(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'List product retrieved successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('List product not found', HttpStatus.NOT_FOUND);
    }
  }

  @Put('list-products/:id')
  async updateListProduct(
    @Param('id') id: string,
    @Body() updateListProductDto: UpdateListProductDto,
  ) {
    try {
      const result = await this.proposeService.updateListProduct(id, updateListProductDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'List product updated successfully',
        data: result,
      };
    } catch (error) {
      throw new HttpException('Failed to update list product', HttpStatus.BAD_REQUEST);
    }
  }
  
  
}
