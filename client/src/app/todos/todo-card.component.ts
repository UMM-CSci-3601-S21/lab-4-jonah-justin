import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../todos/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {

  @Input() todo: Todo;
  @Input() simple ? = false;

  constructor() { }

  ngOnInit(): void {
  }

}
