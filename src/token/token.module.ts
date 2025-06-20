import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';


@Module({
  imports: [],
  providers: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
