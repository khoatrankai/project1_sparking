import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters } from '@nestjs/common';

import { ConflictExceptionFilter } from 'src/common/filters/conflict-exception.filter';
import { SystemService } from './system.service';
import { GetFrequencyDto } from 'src/dto/GetFrequency.dto';
import { UpdateNotifyDto } from 'src/dto/Notify/update.dto';
import { CreateNotifyDto } from 'src/dto/Notify/create.dto';
import { UpdateParkingApartmentDto } from 'src/dto/Apartment/update.dto';
import { CreateParkingApartmentDto } from 'src/dto/Apartment/create.dto';
import { CreateAccountUserDto } from 'src/dto/AccountUser/create.dto';
import { UpdateAccountUserDto } from 'src/dto/AccountUser/update.dto';


@Controller()
@UseFilters(ConflictExceptionFilter)
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  getHello(): string {
    return this.systemService.getHello();
  }

  @Get('find-all_parking_feesession')
  findAllParkingFeesession(@Query() data:GetFrequencyDto){
    return this.systemService.getRevenue(data)
  }
 
  @Post('account-user')
  createUser(@Body() dto: CreateAccountUserDto) {
    return this.systemService.createUser(dto);
  }

  @Put('account-user/:id')
  updateUser(@Param('id') id: string, @Body() dto: UpdateAccountUserDto) {
    return this.systemService.updateUser(id, dto);
  }

  @Delete('account-user')
  deleteUser(@Body() ids: string[]) {
    return this.systemService.deleteUser(ids);
  }

  @Get('account-user/:id')
  getUserById(@Param('id') id: string) {
    return this.systemService.getAccountUser(id);
  }

  // ---------- Parking Apartment ----------
  @Post('apartment')
  createApartment(@Body() dto: CreateParkingApartmentDto) {
    return this.systemService.createApartment(dto);
  }

  @Put('apartment/:id')
  updateApartment(@Param('id') id: string, @Body() dto: UpdateParkingApartmentDto) {
    return this.systemService.updateApartment(id, dto);
  }

  @Delete('apartment')
  deleteApartment(@Body() ids: string[]) {
    return this.systemService.deleteApartment(ids);
  }

  @Get('apartment/:id')
  getApartmentById(@Param('id') id: number) {
    return this.systemService.getApartmentByID(id);
  }

  @Get('apartments')
  getAllApartments() {
    return this.systemService.getApartments();
  }

  // ---------- Notify ----------
  @Post('notify')
  createNotify(@Body() dto: CreateNotifyDto) {
    return this.systemService.createNotify(dto);
  }

  @Put('notify/:id')
  updateNotify(@Param('id') id: string, @Body() dto: UpdateNotifyDto) {
    return this.systemService.updateNotify(id, dto);
  }

  @Delete('notify')
  deleteNotify(@Body() ids: string[]) {
    return this.systemService.deleteNotify(ids);
  }

  @Get('notify/account/:id')
  getNotifiesByAccount(@Param('id') id: string) {
    return this.systemService.getNotifyByIDUser(id);
  }
}
