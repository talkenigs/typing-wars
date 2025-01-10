import { Module } from '@nestjs/common';
import { ProgressGateway } from './progress.gateway';

@Module({
  imports: [],
  providers: [ProgressGateway],
})
export class ProgressModule {}
