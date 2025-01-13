import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    {
      itemId: 2233,
      taskName: 'Debugging Tips',
      taskDescription:
        'Learn how to debug effectively in Chrome DevTools and VS Code.',
      dueDate: '2025-01-21T00:00:00',
      createdOn: '2025-01-13T14:00:00.000',
      isCompleted: false,
      tags: 'Debugging, Tools, Tips',
      completedOn: null,
    },
    {
      itemId: 2234,
      taskName: 'Database Optimization',
      taskDescription:
        'Understand indexing and query optimization techniques in PostgreSQL.',
      dueDate: '2025-01-25T00:00:00',
      createdOn: '2025-01-12T16:20:00.000',
      isCompleted: true,
      tags: 'Database, Optimization, PostgreSQL',
      completedOn: '2025-01-14T10:45:00.000',
    },
    {
      itemId: 2235,
      taskName: 'API Development with Node.js',
      taskDescription:
        'Create a REST API using Express.js with basic CRUD operations.',
      dueDate: '2025-01-19T00:00:00',
      createdOn: '2025-01-13T09:15:00.000',
      isCompleted: false,
      tags: 'API, Node.js, Express',
      completedOn: null,
    },
  ];

  toggleComplete(task: any): void {
    task.isCompleted = !task.isCompleted;
    if (task.isCompleted) {
      task.completedOn = new Date().toISOString();
    } else {
      task.completedOn = null;
    }
  }

  editTask(task: any): void {}

  deleteTask(itemId: number): void {}
}
