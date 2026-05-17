import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AppInfoDto,
  SensorLocalisationDto,
  SensorValueDto,
} from './models/app-info.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  public saveAllInfo(@Body() data: AppInfoDto): Promise<boolean> {
    return this.appService.saveAllInfo(data);
  }

  @Post('localisation')
  public getLocalisation(
    @Body() data: SensorLocalisationDto,
  ): Promise<boolean> {
    return this.appService.saveLocalisation(data);
  }

  @Post('temperature')
  public getTemperature(@Body() data: SensorValueDto): Promise<boolean> {
    return this.appService.saveTemperature(data);
  }

  @Post('pollutiona')
  public getPollutionA(@Body() data: SensorValueDto): Promise<boolean> {
    return this.appService.savePollutionA(data);
  }

  @Post('pollutionb')
  public getPollutionB(@Body() data: SensorValueDto): Promise<boolean> {
    return this.appService.savePollutionB(data);
  }
}
