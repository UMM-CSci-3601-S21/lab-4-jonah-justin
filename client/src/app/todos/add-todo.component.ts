import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todo } from './todo';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  addTodoForm: FormGroup;

  todo: Todo;

  addTodoValidationMessages = {
    name: [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner must be at least 2 characters'},
      {type: 'maxlength', message: 'Owner cannot be more than 50 characters'},
    ],

    category: [
      {type: 'required', message: 'Category is required'},
      {type: 'minlength', message: 'Category must be at least 1 character.'}
    ],

    status: [
      {type: 'required', message: 'Status is required'},
      {type: 'pattern', message: 'Role must be complete or incomplete'}
    ],

    body: [
      {type: 'required', message: 'Body is required'}
    ]
  };
  constructor(
    private fb: FormBuilder,
    private todoService: TodosService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  createForms() {
    this.addTodoForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        (fc) => {
          if (fc.value.toLowerCase() === 'abc123' || fc.value.toLowerCase() === '123abc') {
            return ({existingOwner: true});
          } else {
            return null;
          }
        },
      ])),

      company: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])),

      status: new FormControl('incomplete', Validators.compose([
        Validators.required,
        Validators.pattern('^(complete|incomplete)$'),
      ])),

      body: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }

  ngOnInit(): void {
    this.createForms();
  }

  submitForm() {
    this.todoService.addTodo(this.addTodoForm.value).subscribe(newID => {
      this.snackbar.open('Added Todo ' + this.addTodoForm.value.owner, null, {
        duration: 2000,
      });
      this.router.navigate(['/todos/', newID]);
    }, err => {
      this.snackbar.open('Failed to add the user', 'OK', {
        duration: 5000,
      });
    });
  }
}
