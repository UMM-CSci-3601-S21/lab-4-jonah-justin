import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodosListComponent } from './todos-list.component';
import { TodosService } from './todos.service';

describe('TodosListComponent', () => {
  let todoList: TodosListComponent;
  let fixture: ComponentFixture<TodosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosListComponent ],
      providers: [{ provide: TodosService, useValue: new MockTodoService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListComponent);
    todoList = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(todoList).toBeTruthy();
  });

  it('contains all the todos', () => {
    expect(todoList.serverFilteredTodos.length).toBe(3);
  });

  it('contains a todo owned by \'Phil\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) =>
    todo.owner === 'Phil')).toBe(true);
  });

  it('doesn\'t contain a user named \'Mephistopheles\'', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) =>
    todo.owner === 'Mephistopheles')).toBe(false);
  });

  it('has 2 todos in the \'project\' category', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) =>
    todo.category === 'project').length).toBe(2);
  });
});
