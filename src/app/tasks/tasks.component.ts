import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { TaskDialogReactiveComponent } from '../task-dialog-reactive/task-dialog-reactive.component';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  tasks = [
    {
      itemId: 2230,
      taskName: 'Learn JavaScript Basics',
      taskDescription:
        'Understand the basics of JavaScript, including variables, loops, and functions.',
      dueDate: '2025-01-20T00:00:00',
      createdOn: '2025-01-12T18:30:00.000',
      isCompleted: false,
      tags: 'JavaScript, Basics, Programming',
      completedOn: null,
    },
    {
      itemId: 2231,
      taskName: 'CSS Grid Practice',
      taskDescription:
        'Create a responsive layout using CSS Grid with auto-fit and minmax properties.',
      dueDate: '2025-01-22T00:00:00',
      createdOn: '2025-01-13T10:10:00.000',
      isCompleted: false,
      tags: 'CSS, Grid, Responsive',
      completedOn: null,
    },
    {
      itemId: 2232,
      taskName: 'React State Management',
      taskDescription:
        'Explore useState and useReducer hooks in React to manage component state effectively.',
      dueDate: '2025-01-18T00:00:00',
      createdOn: '2025-01-13T12:00:00.000',
      isCompleted: true,
      tags: 'React, Hooks, State',
      completedOn: '2025-01-14T15:30:00.000',
    },
  ];

  selectedTask: any = null;
  dialogMode: 'edit' | 'add' = 'add';
  isDialogOpen = false;
  useReactiveDialog = false;

  constructor(private dialog: MatDialog) {}

  openTaskDialog(task?: any): void {
    this.selectedTask = task ? { ...task } : {};
    this.dialogMode = task ? 'edit' : 'add';

    const dialogComponent = this.useReactiveDialog
      ? TaskDialogReactiveComponent
      : TaskDialogComponent;

    const dialogRef = this.dialog.open(dialogComponent as any, {
      data: { task: this.selectedTask, mode: this.dialogMode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveTask(result);
      }
    });
  }

  saveTask(updatedTask: any): void {
    if (this.dialogMode === 'edit') {
      const index = this.tasks.findIndex(
        (t) => t.itemId === updatedTask.itemId
      );
      if (index > -1) this.tasks[index] = updatedTask;
    } else {
      updatedTask.itemId = Date.now();
      this.tasks.push(updatedTask);
    }
  }

  editTask(task: any): void {
    this.openTaskDialog(task);
  }

  addTask(): void {
    this.openTaskDialog();
  }

  deleteTask(itemId: number): void {
    this.tasks = this.tasks.filter((task) => task.itemId !== itemId);
  }
}
