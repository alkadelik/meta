import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';


@Module({
  imports: [],
  providers: [],
  controllers: [WebhookController],
})
export class WebhookModule {}
