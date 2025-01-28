import { Routes } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskFormComponent } from './components/tasks/components/task-form/task-form.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MentorComponent } from './components/courses/components/mentor/mentor.component';
import { MenteeComponent } from './components/courses/components/mentee/mentee.component';

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
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      { path: '', redirectTo: 'mentor', pathMatch: 'full' },

      {
        path: 'mentor',
        component: MentorComponent,
      },
      {
        path: 'mentee',
        component: MenteeComponent,
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent },
];
