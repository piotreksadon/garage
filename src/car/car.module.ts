import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Color } from './entities/color.entity';
import { Event } from '../events/entities/event.entity';
import { CAR_BRANDS } from './car.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { carConfig } from './config/car.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car, Color, Event]),
    ConfigModule.forFeature(carConfig),
  ],
  controllers: [CarController],
  providers: [
    CarService,
    { provide: CAR_BRANDS, useFactory: () => ['Volvo', 'Ford'] },
    ConfigService,
  ],
  exports: [CarService],
})
export class CarModule {}
