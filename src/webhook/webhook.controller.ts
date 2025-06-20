import { Controller, Post, Body, HttpCode } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  @HttpCode(200)
  handleWebhook(@Body() payload: any) {
    console.log('Received webhook data:', payload);
    // Handle the webhook data here
    return;
  }
}