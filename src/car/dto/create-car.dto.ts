import { IsNumber, IsString } from 'class-validator';
import { Car } from '../entities/car.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ description: 'Brand of the car.' })
  @IsString()
  readonly brand: Car['brand'];

  @ApiProperty({ description: 'Model of the car.' })
  @IsString()
  readonly model: Car['model'];

  @ApiProperty({ description: 'Production year of the car.' })
  @IsNumber()
  readonly productionYear: Car['productionYear'];

  @ApiProperty({ description: 'Color of the car.' })
  @IsString({ each: true })
  readonly color: [];
}
