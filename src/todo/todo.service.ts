import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  findAll() {
    return this.todoRepository.find();
  }

  create(title: string) {
    const todo = new Todo();
    todo.title = title;
    return this.todoRepository.save(todo);
  }

  async update(id: number, isCompleted: boolean) {
    const todo = await this.todoRepository.findOne({ where: { id: id } });
    if (todo) {
      todo.isCompleted = true;
      return this.todoRepository.save(todo);
    }
    return null;
  }

  delete(id: number) {
    return this.todoRepository.delete(id).then(() => {});
  }
}
