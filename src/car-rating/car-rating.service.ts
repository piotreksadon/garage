import { Injectable } from '@nestjs/common';
import { CarService } from '../car/car.service';

@Injectable()
export class CarRatingService {
  constructor(private readonly carService: CarService) {}
}
