import { Module } from '@nestjs/common';
import { CarRatingService } from './car-rating.service';
import { CarModule } from '../car/car.module';

@Module({
  imports: [CarModule],
  providers: [CarRatingService],
})
export class CarRatingModule {}
