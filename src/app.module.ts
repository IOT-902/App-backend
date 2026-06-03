import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGatewayModule } from './gateways/app.gateway.module';
import { AppInfoModule } from './app-info.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://iot_902:DcJNqtUdVrHohANR63KqnSmcSHkBcR@51.91.101.108:27017/iot_902',
    ),
    EventEmitterModule.forRoot(),
    AppInfoModule,
    AppGatewayModule,
  ],
})
export class AppModule {}