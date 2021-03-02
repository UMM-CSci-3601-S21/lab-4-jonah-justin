import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo, TodoStatus } from './todo';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit, OnDestroy {

  public serverFilteredTodos: Todo[];
  public filteredTodo: Todo[];
  public todoOwner: string;
  public todoBody: string;
  public todoCategory: string;
  public todoStatus: TodoStatus;
  getTodosSub: Subscription;

  constructor(private todosService: TodosService) {

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

}
