import { IsNumber, IsString } from 'class-validator';
import { Car } from '../entities/car.entity';

export class CreateCarDto {
  @IsString()
  readonly brand: Car['brand'];
  @IsString()
  readonly model: Car['model'];
  @IsNumber()
  @IsNumber()
  readonly productionYear: Car['productionYear'];
  @IsString({ each: true })
  readonly color: [];

}
