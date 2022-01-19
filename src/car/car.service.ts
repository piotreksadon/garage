import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Color } from './entities/color.entity';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Event } from '../events/entities/event.entity';
import { ConfigType } from '@nestjs/config';
import { carConfig } from './config/car.config';

@Injectable({ scope: Scope.REQUEST })
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Color)
    private readonly colorRepository: Repository<Color>,
    private readonly connection: Connection,
    @Inject(carConfig.KEY)
    private readonly carConfiguration: ConfigType<typeof carConfig>,
  ) {}

  findAll(paginationQuery: PaginationQueryDto, color?: string) {
    const query = this.carRepository
      .createQueryBuilder('car')
      .leftJoinAndSelect('car.color', 'color');
    if (color) {
      query.where('color.name=:color', { color });
    }
    query.offset(paginationQuery.offset);
    query.limit(paginationQuery.limit);
    return query.getMany();
  }

  async findOne(id: number) {
    const car = await this.carRepository.findOne(id, {
      relations: ['color'],
    });
    if (!car) {
      throw new NotFoundException(`Car no. ${id} does not exist.`);
    }
    return car;
  }

  async create(createCarDto: CreateCarDto) {
    const color = await Promise.all(
      createCarDto.color.map((name) => this.preloadColorByName(name)),
    );
    const car = this.carRepository.create({
      ...createCarDto,
      color,
    });
    return this.carRepository.save(car);
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    const color =
      updateCarDto.color &&
      (await Promise.all(
        updateCarDto.color.map((name) => this.preloadColorByName(name)),
      ));

    const car = await this.carRepository.preload({
      id: +id,
      ...updateCarDto,
      color,
    });
    if (!car) {
      throw new NotFoundException(`Car no. ${id} not found.`);
    }
    return this.carRepository.save(car);
  }

  async remove(id: number) {
    const car = await this.findOne(id);
    return this.carRepository.remove(car);
  }

  private async preloadColorByName(name: string): Promise<Color> {
    const existingColor = await this.colorRepository.findOne({ name });
    if (existingColor) {
      return existingColor;
    }
    return this.colorRepository.create({ name });
  }

  async recommendCar(car: Car) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      car.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_car';
      recommendEvent.type = 'car';
      recommendEvent.payload = { carId: car.id };

      await queryRunner.manager.save(car);
      await queryRunner.manager.save(recommendEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
