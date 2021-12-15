import { Injectable, NotFoundException } from '@nestjs/common';
import { Cars } from './entities/cars.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Colors } from './entities/colors.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private readonly carRepository: Repository<Cars>,
    @InjectRepository(Colors)
    private readonly colorRepository: Repository<Colors>,
  ) {}

  findAll() {
    return this.carRepository.find({
      relations: ['colors'],
    });
  }

  async findOne(id: string) {
    const car = await this.carRepository.findOne(id, {
      relations: ['colors'],
    });
    if (!car) {
      throw new NotFoundException(`Car no. ${id} does not exist.`);
    }
    return car;
  }

  async create(createCarDto: CreateCarDto) {
    const colors = await Promise.all(
      createCarDto.colors.map((name) => this.preloadColorByName(name)),
    );

    const car = this.carRepository.create({
      ...createCarDto,
      colors,
    });
    return this.carRepository.save(car);
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const colors =
      updateCarDto.colors &&
      (await Promise.all(
        updateCarDto.colors.map((name) => this.preloadColorByName(name)),
      ));

    const car = await this.carRepository.preload({
      id: +id,
      ...updateCarDto,
      colors,
    });
    if (!car) {
      throw new NotFoundException(`Car no. ${id} not found.`);
    }
    return this.carRepository.save(car);
  }

  async remove(id: string) {
    const car = await this.findOne(id);
    return this.carRepository.remove(car);
  }

  private async preloadColorByName(name: string): Promise<Colors> {
    const existingColor = await this.colorRepository.findOne({ name });
    if (existingColor) {
      return existingColor;
    }
    return this.colorRepository.create({ name });
  }
}
