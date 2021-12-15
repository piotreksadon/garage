import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Colors } from './colors.entity';

@Entity()
export class Cars {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  productionYear: number;

  @JoinTable()
  @ManyToMany((type) => Colors, (colors) => colors.cars, { cascade: true })
  colors: Colors[];
}
