import { Body, Controller, Post } from '@nestjs/common';
import { AppInfoService } from './app-info.service';
import {
  SensorInfoDto,
} from './models/app-info.dto';
import { AppHistoryInfo } from './models/app-info.schema';

@Controller()
export class AppInfoController {
  constructor(private readonly appInfoService: AppInfoService) {}

  @Post()
  public saveAllInfo(@Body() data: SensorInfoDto): Promise<AppHistoryInfo> {
    return this.appInfoService.update(data);
  }

  // @Post('localisation')
  // public getLocalisation(
  //   @Body() data: SensorLocalisationDto,
  // ): Promise<boolean> {
  //   return this.appService.saveLocalisation(data);
  // }

  // @Post('temperature')
  // public getTemperature(@Body() data: SensorValueDto): Promise<boolean> {
  //   return this.appService.saveTemperature(data);
  // }

  // @Post('pollutiona')
  // public getPollutionA(@Body() data: SensorValueDto): Promise<boolean> {
  //   return this.appService.savePollutionA(data);
  // }

  // @Post('pollutionb')
  // public getPollutionB(@Body() data: SensorValueDto): Promise<boolean> {
  //   return this.appService.savePollutionB(data);
  // }
}
