import { Controller, Get, Query } from '@nestjs/common';
import { ConversationService } from './conversation.service';

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('ls')
  async getInstagramConversations() {
    return this.conversationService.getInstagramConversations();
  }

  @Get('conversation-id')
  async getConvoId() {
    return this.conversationService.getConversationId()
  }
}