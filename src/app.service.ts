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
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await this.appStoreService.addAllInfo(data);
    return true;
  }

  public saveLocalisation(data: ISensorLocalisation): Promise<boolean> {
    console.log('saveLocalisation appService :', data);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  public saveTemperature(data: ISensorValue): Promise<boolean> {
    console.log('saveTemperature appService :', data);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  public savePollutionA(data: ISensorValue): Promise<boolean> {
    console.log('savePollutionA appService :', data);
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  public savePollutionB(data: ISensorValue): Promise<boolean> {
    console.log('savePollutionB appService :', data);
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
