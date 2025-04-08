import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'node:fs';
import { createWorker } from 'tesseract.js';
import * as R from 'ramda';
import { Buffer } from 'node:buffer';

@Injectable()
export class AppService {
  async extractJsonData(base64Image: string): Promise<Record<string, any>> {
    const imageBufferString = R.pipe(R.split(','), R.nth(1))(base64Image);
    console.log('Image buffer string: ', imageBufferString);
    const imageBuffer = Buffer.from(imageBufferString, 'base64');

    writeFileSync('json-image.png', imageBuffer);
    const worker = await createWorker('eng');
    const imageData = await worker.recognize('json-image.png');
    console.log('Raw image data: ', imageData.data.text);
    // const jsonDataStr = R.pipe(
    //   R.replace(/[“\,”]/g, `"`),
    //   // R.replace(/[”]/g, `"`),
    //   // R.replace(/""/g, `"`),
    // )(imageData.data.text);
    const jsonDataStr = R.replace(/[“”]/g, `"`, imageData.data.text);
    console.log('Image data', jsonDataStr);
    const jsonDataObj = JSON.parse(jsonDataStr);

    await worker.terminate();
    return {
      success: true,
      data: jsonDataObj,
      message: 'Successfully extracted JSON from image',
    };
  }
}
