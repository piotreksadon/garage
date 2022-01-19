import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  model: string;

  @Column()
  productionYear: number;

  @Column({ default: 0 })
  recommendations: number;

  @JoinTable()
  @ManyToMany((type) => Color, (color) => color.car, { cascade: true })
  color: Color[];
}
