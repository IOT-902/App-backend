import { Module } from '@nestjs/common';
import { AppStore } from './app-store.service';

@Module({
  providers: [AppStore],
  exports: [AppStore],
})
export class AppStoreModule {}
