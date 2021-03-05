import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from 'src/app/todos/todo';
import { TodosService } from '../app/todos/todo.service';
@Injectable()
export class MockTodoService extends TodosService {
  static testTodos: Todo[] = [
    {
      _id: '1',
      owner: 'Bill',
      status: 'complete',
      body: 'This Or That',
      category: 'video games'
    },
    {
      _id: '2',
      owner: 'Phil',
      status: 'incomplete',
      body: 'these or those',
      category: 'project'
    },
    {
      _id: '3',
      owner: 'Wanda',
      status: 'complete',
      body: 'them',
      category: 'project'
    }
  ];
  constructor() {
    super(null);
  }

  getTodos(){
    return of(MockTodoService.testTodos);
  }
}
