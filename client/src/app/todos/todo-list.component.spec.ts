import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoCardComponent } from './todo-card.component';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodoListComponent', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ TodoListComponent, TodoCardComponent ],
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
