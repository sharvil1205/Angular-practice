import { Component } from '@angular/core';
import { completedTasks } from '../../constants';
import { TasksComponent } from '../tasks/tasks.component';

@Component({
  selector: 'app-completed-tasks',
  imports: [TasksComponent],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.css',
})
export class CompletedTasksComponent {
  tasks = completedTasks;

  handleTaskUpdated(updatedTasks: any[]): void {
    this.tasks = updatedTasks;
  }
}
