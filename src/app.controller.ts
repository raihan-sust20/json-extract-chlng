import { Body, Controller, Post } from '@nestjs/common';
import * as R from 'ramda';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  extractJsonData(@Body() request: Record<string, any>): Record<string, any> {
    const base64Image = R.prop('imageBase64', request);
    console.log('Base 64 IMage: ', base64Image);
    return this.appService.extractJsonData(base64Image);
  }
}
