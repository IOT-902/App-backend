import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGatewayModule } from './gateways/app.gateway.module';
import { AppStoreModule } from './store/app-store.module';

@Module({
  imports: [AppGatewayModule, AppStoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
