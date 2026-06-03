import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppInfoController } from './app-info.controller';
import { AppInfoService } from './app-info.service';
import {
  AppHistoryInfo,
  AppHistoryInfoSchema,
} from './models/app-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AppHistoryInfo.name, schema: AppHistoryInfoSchema },
    ]),
  ],
  controllers: [AppInfoController],
  providers: [AppInfoService],
  exports: [AppInfoService],
})
export class AppInfoModule {}