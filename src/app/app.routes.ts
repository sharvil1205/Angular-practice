import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/tasks/components/task-form/task-form.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'allTasks', pathMatch: 'full' },

  {
    path: 'allTasks',
    component: TasksComponent,
  },
  {
    path: 'allTasks/add',
    component: TaskFormComponent,
  },
  {
    path: 'allTasks/edit',
    component: TaskFormComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];
