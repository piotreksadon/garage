import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/cars.entity';
import { Colors } from './entities/colors.entity';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Colors, Event])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
