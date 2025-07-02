import { Controller, Get } from '@nestjs/common';
import { ReaderService } from './reader.service';
// import { ExtractProductsService } from '../extract-products/extract-products.service';

@Controller('reader')
export class ReaderController {
  constructor(
    private readonly extractProductsService: ReaderService,
  ) {}

  @Get('extract')
  async extractProducts() {
    return await this.extractProductsService.extractFromJsonFile(
      'messageFiles/goddesselixir_17937149627627382/message_1.json',
    );
  }
}