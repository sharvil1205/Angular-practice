import { Component } from '@angular/core';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, TaskDialogComponent],
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

  toggleComplete(task: any): void {
    task.isCompleted = !task.isCompleted;
  }

  openTaskDialog(task?: any): void {
    this.selectedTask = task ? { ...task } : {};
    this.dialogMode = task ? 'edit' : 'add';
    this.isDialogOpen = true;
  }

  closeTaskDialog(): void {
    this.isDialogOpen = false;
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
    this.closeTaskDialog();
  }

  editTask(task: any): void {
    this.openTaskDialog(task);
  }

  deleteTask(itemId: number): void {
    this.tasks = this.tasks.filter((task) => task.itemId !== itemId);
  }
}
