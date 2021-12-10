import { IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  readonly brand: string;
  @IsString()
  readonly model: string;
  @IsNumber()
  readonly productionYear: number;
  @IsString({ each: true })
  readonly colors: string[];
}
