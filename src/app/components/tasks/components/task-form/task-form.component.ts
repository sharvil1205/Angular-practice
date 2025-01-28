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
import { TasksService } from '../../services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../../../services/toast.service';

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
    HttpClientModule,
  ],
  providers: [TasksService, ToastService],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  task: any = {};
  mode: 'edit' | 'add' = 'add';
  previousUrl: string;
  currentDate = new Date();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private tasksService: TasksService,
    private toastService: ToastService
  ) {
    this.previousUrl = this.location.getState()
      ? this.router
          .getCurrentNavigation()
          ?.previousNavigation?.finalUrl?.toString() || '/allTasks'
      : '/allTasks';

    // this.route.paramMap.subscribe((params) => {
    //   const taskId = params.get('taskId');
    //   console.log(taskId);
    // });
  }

  ngOnInit(): void {
    const state = this.location.getState() as { task: any };
    if (state?.task?.taskName) {
      this.task = state.task;
      this.mode = 'edit';
    } else {
      this.mode = 'add';
      this.task = { taskName: '', dueDate: null };
    }
  }

  addTask(): void {
    const task = {
      itemId: 0,
      taskName: this.task?.taskName ?? '',
      taskDescription: this.task?.taskDescription ?? '',
      dueDate: this.task?.dueDate?.toISOString() ?? '',
      isCompleted: false,
      tags: this.task?.tags ?? '',
      completedOn: this.currentDate?.toISOString() ?? '',
      createdOn: this.currentDate?.toISOString() ?? '',
    };

    this.tasksService.addTask(task).subscribe({
      next: (response) => {
        if (response?.result) {
          this.toastService.showSuccess('Task added successfully');
          this.location.back();
        }
      },
      error: (error) => {
        this.toastService.showError('Error adding task');
      },
    });
  }

  updateTask(): void {
    const task = {
      itemId: this.task.itemId,
      taskName: this.task?.taskName ?? '',
      taskDescription: this.task?.taskDescription ?? '',
      dueDate: new Date(this.task?.dueDate).toISOString() ?? '',
      isCompleted: this.task.isCompleted ?? false,
      createdOn: this.task?.createdOn ?? '',
      tags: this.task?.tags ?? '',
      completedOn: this.currentDate?.toISOString(),
    };

    this.tasksService.updateTask(task).subscribe({
      next: (response) => {
        if (response.result) {
          this.toastService.showSuccess('Task updated successfully');
          this.location.back();
        }
      },
      error: (error) => {
        console.error('Error adding task', error);
      },
    });
  }

  onSave(): void {
    this.mode === 'add' ? this.addTask() : this.updateTask();
  }

  onCancel(): void {
    this.location.back();
  }
}
