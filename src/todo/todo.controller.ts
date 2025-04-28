import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Logger,
  Inject,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { WINSTON_MODULE_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';

@Controller('todo')
export class TodoController {
  //logger: Logger;

  constructor(
    private readonly todoService: TodoService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {
    this.logger = new Logger(TodoController.name, { timestamp: true });
  }

  @Get()
  findAll() {
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    this.logger.log("Appel de l'API en GET sur todo");
    winston.log('info', 'Appel sur API en GET');
    return this.todoService.findAll();
  }

  @Post()
  create(@Body('title') title: string) {
    return this.todoService.create(title);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('isCompleted') isCompleted: boolean) {
    return this.todoService.update(id, isCompleted);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.todoService.delete(id);
  }
}
