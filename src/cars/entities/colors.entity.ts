import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './cars.entity';

@Entity()
export class Colors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Car, (car) => car.colors)
  cars: Car[];
}
