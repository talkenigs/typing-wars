import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProgressGateway } from '../progress/progress.gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly progressGateway: ProgressGateway
  ) {}

  @Get()
  async handle() {
    this.progressGateway.updateProgress()
  }
}
