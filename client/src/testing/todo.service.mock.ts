import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from 'src/app/todos/todo';
import { TodosService } from '../app/todos/todos.service';
@Injectable()
export class MockTodoService extends TodosService {
  static testTodos: Todo[] = [
    {
      _id: '1',
      owner: 'Bill',
      status: 'complete',
      body: 'This Or That',
      category: 'video games'
    }
  ];
  constructor() {
    super(null);
  }

  getTodos(){
    return of(MockTodoService.testTodos);
  }
}
