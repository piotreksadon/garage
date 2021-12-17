import { IsNumber, IsString } from 'class-validator';
import { Car } from '../entities/cars.entity';

export class CreateCarDto {
  @IsString()
  readonly brand: Car['brand'];
  @IsString()
  readonly model: Car['model'];
  @IsNumber()
  readonly productionYear: Car['productionYear'];
  @IsString({ each: true })
  readonly colors: string[];
}
