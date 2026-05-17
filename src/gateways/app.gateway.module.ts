import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppStoreModule } from 'src/store/app-store.module';

@Module({
  imports: [AppStoreModule],
  providers: [AppGateway],
  exports: [AppGateway],
})
export class AppGatewayModule {}
