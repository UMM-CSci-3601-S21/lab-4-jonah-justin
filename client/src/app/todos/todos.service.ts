import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Todo, TodoStatus } from './todo';

@Injectable()
export class TodosService{
  readonly todoUrl: string = environment.apiUrl + 'todos';

  constructor(private httpClient: HttpClient) { }
  getTodos(filters?: { status?: TodoStatus; body?: string; owner?: string; category?: string}): Observable<Todo[]> {
    let httpParams = new HttpParams();
    if (filters) {
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
      if(filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if(filters.category) {
        httpParams = httpParams.set('category', filters.category);
      }
    }
    return this.httpClient.get<Todo[]>(this.todoUrl, { params: httpParams });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  filterTodos(todos: Todo[], filters: { owner?: string; category?: string; body: string}): Todo[] {

    let filteredTodos = todos;

    if (filters.owner) {
      filters.owner = filters.owner.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.owner.toLowerCase().indexOf(filters.owner) !== -1);
    }

    if (filters.category) {
      filters.category = filters.category.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    if (filters.body) {
      filters.body = filters.body.toLowerCase();

      filteredTodos = filteredTodos.filter(todo => todo.body.toLowerCase().indexOf(filters.body) !== -1);
    }

    // if (filters.status) {
    //   filters.status = filters.status;
    //   filteredTodos = filteredTodos.filter(todo => todo.status.indexOf(filters.status) !== -1);
    // }

    return filteredTodos;
  }

  addTodo(newTodo: Todo): Observable<string> {
    return this.httpClient.post<{id: string}>(this.todoUrl, newTodo).pipe(map(res => res.id));
  }
}
