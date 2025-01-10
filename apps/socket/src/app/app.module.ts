import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProgressModule } from '../progress/progress.module';
import { ProgressGateway } from '../progress/progress.gateway';

@Module({
  imports: [ProgressModule],
  controllers: [AppController],
  providers: [AppService, ProgressGateway],
})
export class AppModule {}
