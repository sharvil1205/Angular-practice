import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogReactiveComponent } from './task-dialog-reactive.component';

describe('TaskDialogReactiveComponent', () => {
  let component: TaskDialogReactiveComponent;
  let fixture: ComponentFixture<TaskDialogReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskDialogReactiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDialogReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
