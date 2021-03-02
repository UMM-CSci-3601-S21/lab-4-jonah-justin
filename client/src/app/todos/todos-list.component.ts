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
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoBody: string;
  public todoCategory: string;
  public todoStatus: TodoStatus;
  getTodosSub: Subscription;

  constructor(private todosService: TodosService) {

  }

  getTodosFromServer(): void {
    this.unsub();
    this.getTodosSub = this.todosService.getTodos({
      status: this.todoStatus,
      body: this.todoBody
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.log(err);
    });
  }
  updateFilter() {
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { owner: this.todoOwner, status: this.todoStatus});
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

  unsub(): void {
    if (this.getTodosSub) {
      this.getTodosSub.unsubscribe();
    }
  }

}
