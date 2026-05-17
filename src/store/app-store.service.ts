import { Injectable } from '@nestjs/common';
import { WEBSOCKET_APP_ROOM } from 'src/const/gateway.constant';
import { AppGateway } from 'src/gateways/app.gateway';
import { IAppHistoryInfo, IAppInfo } from 'src/models/app-info.model';

@Injectable()
export class AppStore {
  private _state: IAppHistoryInfo = {
    localisations: [],
    temperatures: [],
    pollutionAs: [],
    pollutionBs: [],
  };

  private gateway?: AppGateway;

  setGateway(gateway: AppGateway) {
    this.gateway = gateway;
  }

  public get state() {
    return this._state;
  }

  public addAllInfo(data: IAppInfo): void {
    this._state.localisations.push(data.localisation);
    this._state.temperatures.push(data.temperature);
    this._state.pollutionAs.push(data.pollutionA);
    this._state.pollutionBs.push(data.pollutionB);

    this.gateway?.sendState(WEBSOCKET_APP_ROOM, this._state);
  }
}
