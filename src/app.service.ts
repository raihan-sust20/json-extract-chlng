import { Injectable } from '@nestjs/common';
import { Buffer } from 'node:buffer';

@Injectable()
export class AppService {
  extractJsonData(base64Image: string): Record<string, any> {
    const imageBuffer = Buffer.from(base64Image, 'base64');
    const jsonData = imageBuffer.toJSON();
    console.log('Json data: ', jsonData);

    return {
      success: true,
      data: jsonData,
      message: 'Successfully extracted JSON from image',
    };
  }
}
