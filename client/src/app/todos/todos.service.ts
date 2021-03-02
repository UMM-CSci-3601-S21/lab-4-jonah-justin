import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodosService{
  readonly todoUrl: string = environment.apiUrl + 'todos';
  constructor(private httpClient: HttpClient) { }
  getTodos(): Observable<Todo[]> {
    const httpParams = new HttpParams();
    return this.httpClient.get<Todo[]>(this.todoUrl, { params: httpParams });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }
}
