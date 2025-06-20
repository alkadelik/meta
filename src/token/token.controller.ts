import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TokenService } from './token.service';

@Controller('auth')
export class TokenController {

    constructor(private readonly tokenService: TokenService) {}


  @Get('access-token')
  async getAccessToken() {
    // Replace with your actual access token logic
    // const accessToken = `token-for-${userId}`;
    const crtAccessToken = await this.tokenService.getAccessToken()

    return { crtAccessToken };
  }

@Post('/ll-token')
async getLongLivedToken(@Body() body: { 'll-token': string }) {
  const shortLivedToken = body['ll-token'];
  console.log(shortLivedToken, 'short token');
  const longLived = await this.tokenService.longLivedToken(shortLivedToken);
//   return { longLived };
}
}