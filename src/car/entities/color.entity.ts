import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity()
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany((type) => Car, (car) => car.color)
  car: Car[];
}
