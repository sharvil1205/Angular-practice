import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { upcomingTasks } from '../../constants';

@Component({
  selector: 'app-upcoming-tasks',
  imports: [TasksComponent],
  templateUrl: './upcoming-tasks.component.html',
  styleUrl: './upcoming-tasks.component.css',
})
export class UpcomingTasksComponent {
  tasks = upcomingTasks;

  handleTaskUpdated(updatedTasks: any[]): void {
    this.tasks = updatedTasks;
  }
}
