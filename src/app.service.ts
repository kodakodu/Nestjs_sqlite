import { Injectable, Logger } from '@nestjs/common';
var winston = require('winston');

winston.info('Hello again distributed logs');
@Injectable()
export class AppService {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }
  getHello(): string {
    this.logger.log('test');

    return 'Hello World!';
  }
}
