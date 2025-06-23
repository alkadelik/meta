import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookStrategy } from './facebook.strategy';
import { WebhookModule } from './webhook/webhook.module';
import { TokenModule } from './token/token.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [WebhookModule, TokenModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy],
})
export class AppModule {}
