import { Routes, withRouterConfig } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { UpcomingTasksComponent } from './upcoming-tasks/upcoming-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { OverdueTasksComponent } from './overdue-tasks/overdue-tasks.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardStatsComponent } from './dashboard-stats/dashboard-stats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'allTasks', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'stats', component: DashboardStatsComponent },
    ],
  },
  {
    path: 'allTasks',
    component: TasksComponent,
  },
  {
    path: 'allTasks/add',
    component: TaskFormComponent,
  },
  {
    path: 'allTasks/:taskId/edit',
    component: TaskFormComponent,
    data: { renderMode: 'client', prerender: false },
    providers: [
      {
        provide: 'getPrerenderParams',
        useValue: () => {
          return [{ taskId: '1' }]; // provide default params for prerendering
        },
      },
    ],
  },
  { path: 'upcoming', component: UpcomingTasksComponent },
  { path: 'done', component: CompletedTasksComponent },
  { path: 'overdue', component: OverdueTasksComponent },
  { path: '**', component: PageNotFoundComponent },
];

withRouterConfig({
  paramsInheritanceStrategy: 'always',
  onSameUrlNavigation: 'reload',
});
