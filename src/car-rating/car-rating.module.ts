import { Module } from '@nestjs/common';
import { CarRatingService } from './car-rating.service';
import { CarModule } from '../car/car.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      password: 'password',
      port: 5432,
    }),
    CarModule,
  ],
  providers: [CarRatingService],
})
export class CarRatingModule {}
