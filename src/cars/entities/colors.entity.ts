import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cars } from './cars.entity';

@Entity()
export class Colors {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Cars, (car) => car.colors)
  cars: Cars[];
}
