/* eslint-disable @typescript-eslint/await-thenable */
import { Injectable } from '@nestjs/common';
import {
  IAppInfo,
  ISensorLocalisation,
  ISensorValue,
} from './models/app-info.model';
import { AppStore } from './store/app-store.service';

@Injectable()
export class AppService {
  constructor(private readonly appStoreService: AppStore) {}

  public async saveAllInfo(data: IAppInfo): Promise<boolean> {
    await this.appStoreService.addAllInfo(data);
    return true;
  }

  public async saveLocalisation(data: ISensorLocalisation): Promise<boolean> {
    await this.appStoreService.addLocalisationInfo(data);
    return true;
  }

  public async saveTemperature(data: ISensorValue): Promise<boolean> {
    await this.appStoreService.addSensorInfo(data, 'temperature');
    return true;
  }

  public async savePollutionA(data: ISensorValue): Promise<boolean> {
    await this.appStoreService.addSensorInfo(data, 'pollutionA');
    return true;
  }

  public async savePollutionB(data: ISensorValue): Promise<boolean> {
    await this.appStoreService.addSensorInfo(data, 'pollutionB');
    return true;
  }
}
