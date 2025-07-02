import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacebookStrategy } from './facebook.strategy';
import { WebhookModule } from './webhook/webhook.module';
import { TokenModule } from './token/token.module';
import { ConversationModule } from './conversation/conversation.module';
import { ReaderModule } from './reader/reader.module';

@Module({
  imports: [WebhookModule, TokenModule, ConversationModule, ReaderModule],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy],
})
export class AppModule {}
