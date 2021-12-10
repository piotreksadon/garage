import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './entities/cars.entity';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: 1,
      brand: 'Volvo',
      model: '850',
      productionYear: 1996,
      colors: ['dark olive pearl', 'sapphire blue'],
    },
  ];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === +id);
    if (!car) {
      throw new NotFoundException(`Car no. ${id} does not exist.`);
    }
    return car;
  }

  create(createCarDto: any) {
    this.cars.push(createCarDto);
    return createCarDto;
  }

  update(id: string, body: any) {
    const existingCar = this.findOne(id);
    if (existingCar) {
      //update the existing entity
    }
  }

  remove(id: string) {
    const carsIndex = this.cars.findIndex((car) => car.id === +id);
    if (carsIndex >= 0) {
      this.cars.splice(carsIndex, 1);
    }
  }
}
