import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  findAll() {
    // const { limit, offset } = paginationQuery;
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.carsService.findOne('' + id);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    console.log(createCarDto instanceof CreateCarDto);
    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
