import { Injectable } from '@nestjs/common';
import { WEBSOCKET_APP_ROOM } from 'src/const/gateway.constant';
import { AppGateway } from 'src/gateways/app.gateway';
import {
  IAppHistoryInfo,
  IAppInfo,
  ISensorLocalisation,
  ISensorValue,
} from 'src/models/app-info.model';

type SensorKey = 'temperatures' | 'pollutionAs' | 'pollutionBs';
type SensorType = 'temperature' | 'pollutionA' | 'pollutionB';

@Injectable()
export class AppStore {
  private _state: IAppHistoryInfo = {
    localisations: [],
    temperatures: [],
    pollutionAs: [],
    pollutionBs: [],
  };

  private gateway?: AppGateway;

  private sensorMap: Record<SensorType, SensorKey> = {
    temperature: 'temperatures',
    pollutionA: 'pollutionAs',
    pollutionB: 'pollutionBs',
  };

  setGateway(gateway: AppGateway) {
    this.gateway = gateway;
  }

  public get state() {
    return this._state;
  }

  private emitState(): void {
    this.gateway?.sendState(WEBSOCKET_APP_ROOM, this._state);
  }

  public addAllInfo(data: IAppInfo): void {
    this._state.localisations.push(data.localisation);
    this._state.temperatures.push(data.temperature);
    this._state.pollutionAs.push(data.pollutionA);
    this._state.pollutionBs.push(data.pollutionB);

    this.emitState();
  }

  public addLocalisationInfo(data: ISensorLocalisation): void {
    this._state.localisations.push(data);

    this.emitState();
  }

  public addSensorInfo(data: ISensorValue, type: SensorType): void {
    const key = this.sensorMap[type];

    this._state[key].push(data);

    this.emitState();
  }
}
