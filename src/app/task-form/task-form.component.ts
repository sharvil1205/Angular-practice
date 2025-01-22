import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  task: any = {};
  mode: 'edit' | 'add' = 'add';
  previousUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.previousUrl = this.location.getState()
      ? this.router
          .getCurrentNavigation()
          ?.previousNavigation?.finalUrl?.toString() || '/allTasks'
      : '/allTasks';
  }

  ngOnInit(): void {
    const state = this.location.getState() as { task: any };
    if (state?.task) {
      this.task = state.task;
      this.mode = 'edit';
    } else {
      this.mode = 'add';
      this.task = { taskName: '', dueDate: null };
    }
  }

  onSave(): void {
    this.location.back();
  }

  onCancel(): void {
    this.location.back();
  }
}
