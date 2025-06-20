import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookStrategy } from './facebook.strategy';
import { WebhookModule } from './webhook/webhook.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [WebhookModule, TokenModule],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy],
})
export class AppModule {}
