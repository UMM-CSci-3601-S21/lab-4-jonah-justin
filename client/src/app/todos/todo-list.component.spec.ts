import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

describe('TodoListComponent', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
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
