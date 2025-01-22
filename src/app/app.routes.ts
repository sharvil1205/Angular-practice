import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { OverdueTasksComponent } from './overdue-tasks/overdue-tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'allTasks', pathMatch: 'full' },

  {
    path: 'allTasks',
    children: [
      {
        path: '',
        component: TasksComponent,
      },
      {
        path: 'add',
        component: TaskFormComponent,
      },
      {
        path: ':taskId/edit',
        component: TaskFormComponent,
      },
    ],
  },
  {
    path: 'upcoming',
    component: UpcomingTasksComponent,
    children: [
      { path: 'add', component: TaskFormComponent },
      { path: ':taskId/edit', component: TaskFormComponent },
    ],
  },
  {
    path: 'done',
    component: CompletedTasksComponent,
    children: [
      { path: 'add', component: TaskFormComponent },
      { path: ':taskId/edit', component: TaskFormComponent },
    ],
  },
  {
    path: 'overdue',
    component: OverdueTasksComponent,
    children: [
      { path: 'add', component: TaskFormComponent },
      { path: ':taskId/edit', component: TaskFormComponent },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
