import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppInfoModule } from '../app-info.module';

@Module({
  imports: [AppInfoModule],
  providers: [AppGateway],
})
export class AppGatewayModule {}