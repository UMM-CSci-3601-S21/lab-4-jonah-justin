import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCardComponent } from './todo-card.component';
import { MatCardModule } from '@angular/material/card';

describe('TodoCardComponent', () => {
  let component: TodoCardComponent;
  let fixture: ComponentFixture<TodoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [ TodoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
