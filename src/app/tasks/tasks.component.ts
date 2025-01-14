import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
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

  toggleComplete(task: any): void {
    task.isCompleted = !task.isCompleted;
    task.completedOn = task.isCompleted ? new Date().toISOString() : null;
  }

  constructor(private dialog: MatDialog) {}

  editTask(task: any): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '800px',
      data: { task: { ...task }, mode: 'edit' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.tasks.findIndex((t) => t.itemId === task.itemId);
        if (index > -1) this.tasks[index] = result;
      }
    });
  }

  addTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '400px',
      panelClass: 'myapp-no-padding-dialog',
      data: { task: {}, mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.itemId = Date.now();
        this.tasks.push(result);
      }
    });
  }

  deleteTask(itemId: number): void {
    this.tasks = this.tasks.filter((task) => task.itemId !== itemId);
  }
}
