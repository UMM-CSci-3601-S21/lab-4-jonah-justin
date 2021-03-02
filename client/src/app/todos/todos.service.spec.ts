import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';

import { TodosService } from './todos.service';

describe('TodosService', () => {

  const testTodos: Todo[] = [
    {
      _id: '1',
      owner: 'Bill',
      status: 'complete',
      body: 'This Or That',
      category: 'video games'
    }
  ];
  let todoService: TodosService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({imports:
      [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    todoService = new TodosService(httpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('getTodos() call api/todos', () => {
    todoService.getTodos().subscribe(
      todos => expect(todos).toEqual(testTodos)
    );

    const req = httpTestingController.expectOne(todoService.todoUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(testTodos);
  });

  it('getTodosById() calls api/todos/id', () => {
    const targetTodo: Todo = testTodos[0];
    const targetId: string= targetTodo._id;
    todoService.getTodoById(targetId).subscribe(
      todo => expect(todo).toBe(targetTodo)
    );

    const expectedUrl: string = todoService.todoUrl + '/' + targetId;
    const req = httpTestingController.expectOne(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(targetTodo);
  });
});
