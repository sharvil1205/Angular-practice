import { Component } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { overdueTasks } from '../../constants';

@Component({
  selector: 'app-overdue-tasks',
  imports: [TasksComponent],
  templateUrl: './overdue-tasks.component.html',
  styleUrl: './overdue-tasks.component.css',
})
export class OverdueTasksComponent {
  tasks = overdueTasks;

  handleTaskUpdated(updatedTasks: any[]): void {
    this.tasks = updatedTasks;
  }
}
