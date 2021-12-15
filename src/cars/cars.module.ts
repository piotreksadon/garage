import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './entities/cars.entity';
import { Colors } from './entities/colors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cars, Colors])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
