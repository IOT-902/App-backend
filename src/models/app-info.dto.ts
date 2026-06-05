import { Type } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsMACAddress,
  IsNumber,
  ValidateNested,
} from 'class-validator';

export class SensorLocalisationDto {
  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsDateString()
  time!: Date;
}

export class SensorValueDto {
  @IsNumber()
  value!: number;

  @IsDateString()
  time!: Date;
}

export class SensorInfoDto {
  @IsDefined()
  @IsMACAddress()
  mac_adress!: string;

  @IsDefined()
  @ValidateNested()
  @Type(() => SensorLocalisationDto)
  localisation!: SensorLocalisationDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => SensorValueDto)
  temperature!: SensorValueDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => SensorValueDto)
  pollutionA!: SensorValueDto;

  @IsDefined()
  @ValidateNested()
  @Type(() => SensorValueDto)
  pollutionB!: SensorValueDto;
}
