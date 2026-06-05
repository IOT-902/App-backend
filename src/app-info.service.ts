import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SensorInfoDto } from './models/app-info.dto';
import { AppHistoryInfo } from './models/app-info.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AppInfoService {
  constructor(
    @InjectModel(AppHistoryInfo.name)
    private appHistoryInfoModel: Model<AppHistoryInfo>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async findHistory(): Promise<AppHistoryInfo | null> {
    return this.appHistoryInfoModel.findOne().exec();
  }

  async update(sensorInfo: SensorInfoDto): Promise<AppHistoryInfo> {
    let result = await this.appHistoryInfoModel
      .findOneAndUpdate(
        { 'data.mac_adress': sensorInfo.mac_adress },
        {
          $push: {
            'data.$.localisations': sensorInfo.localisation,
            'data.$.temperatures': sensorInfo.temperature,
            'data.$.pollutionAs': sensorInfo.pollutionA,
            'data.$.pollutionBs': sensorInfo.pollutionB,
          },
        },
        { new: true },
      )
      .exec();

    if (!result) {
      result = await this.appHistoryInfoModel
        .findOneAndUpdate(
          {},
          {
            $push: {
              data: {
                mac_adress: sensorInfo.mac_adress,
                localisations: [sensorInfo.localisation],
                temperatures: [sensorInfo.temperature],
                pollutionAs: [sensorInfo.pollutionA],
                pollutionBs: [sensorInfo.pollutionB],
              },
            },
          },
          { new: true, upsert: true },
        )
        .exec();
    }

    this.eventEmitter.emit('history.updated');

    return result;
  }
}
