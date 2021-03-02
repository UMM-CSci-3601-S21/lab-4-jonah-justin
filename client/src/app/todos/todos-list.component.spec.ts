import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockTodoService } from '../../testing/todo.service.mock';
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
});
