import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Car')
@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @Get()
  async findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query('color') color?: string,
  ) {
    return this.carService.findAll(paginationQuery, color);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.carService.findOne(id);
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.carService.remove(id);
  }
}
