import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Color } from './entities/color.entity';
import { Event } from '../events/entities/event.entity';
import { CAR_BRANDS } from './car.constants';

class ConfigService {}
class DevConfigService {}
class ProdConfigService {}

@Module({
  imports: [TypeOrmModule.forFeature([Car, Color, Event])],
  controllers: [CarController],
  providers: [
    CarService,
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevConfigService
          : ProdConfigService,
    },
    { provide: CAR_BRANDS, useFactory: () => ['Volvo', 'Ford'] },
  ],
  exports: [CarService],
})
export class CarModule {}
