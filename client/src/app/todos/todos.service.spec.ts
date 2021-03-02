import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';

import { TodosService } from './todos.service';

describe('TodosService', () => {

  const testTodos: Todo[] = [
    {
      _id: '1'
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
    todoService = TestBed.inject(TodosService);
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
});
