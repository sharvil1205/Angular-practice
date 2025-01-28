import { Component, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskFilterPipe } from './pipes/task-filter.pipe';
import { TasksService } from './services/tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../services/toast.service';
import { TaskDueDateDirective } from './directives/task-due-date.directive';
import { MatIconModule } from '@angular/material/icon';
import { TaskDialogReactiveComponent } from './components/task-dialog-reactive/task-dialog-reactive.component';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCardModule,
    RouterOutlet,
    MatDialogModule,
    TaskFilterPipe,
    HttpClientModule,
    TaskDueDateDirective,
    MatIconModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [TasksService],
})
export class TasksComponent {
  @Input() tasks: any[] = [];
  filterText: string = '';

  selectedTask: any = null;
  mode: 'edit' | 'add' = 'add';
  useReactiveDialog = false;
  isAllTasksRoute: boolean = false;
  isDialogOpen = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private tasksService: TasksService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.checkRoute();
    if (this.isAllTasksRoute) this.loadTasks();
  }

  loadTasks(): void {
    this.tasksService.getAllTasks().subscribe({
      next: (response) => {
        this.tasks = response.data || [];
      },
      error: (error) => {
        console.error('Error fetching tasks', error);
      },
    });
  }

  openTaskDialog(task?: any): void {
    this.selectedTask = task ? { ...task } : {};
    this.mode = task ? 'edit' : 'add';

    const dialogComponent = TaskDialogReactiveComponent;

    const dialogRef = this.dialog.open(dialogComponent as any, {
      data: { task: this.selectedTask, mode: this.mode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveTask(result);
      }
    });
  }

  toggleTaskCompletion(task: any): void {
    const updatedTask = { ...task, isCompleted: task.isCompleted };

    this.tasksService.updateTask(updatedTask).subscribe({
      next: (response) => {
        if (response?.result) {
          task.isCompleted = updatedTask.isCompleted;
          this.toastService.showSuccess(
            `Task marked as ${task.isCompleted ? 'Complete' : 'Incomplete'}`
          );
        } else {
          this.toastService.showError('Failed to update task status');
        }
      },
      error: (error) => {
        console.error('Error updating task status', error);
        this.toastService.showError(
          'An error occurred while updating the task'
        );
      },
    });
  }

  saveTask(updatedTask: any): void {
    if (this.mode === 'edit') {
      const index = this.tasks.findIndex(
        (t) => t.itemId === updatedTask.itemId
      );
      if (index > -1) this.tasks[index] = updatedTask;
    } else {
      updatedTask.itemId = Date.now();
      this.tasks.push(updatedTask);
    }
  }

  editTask(task: any): void {
    this.openTaskDialog(task);
  }

  addTask(): void {
    this.openTaskDialog();
  }

  openTaskPage(task?: any): void {
    this.selectedTask = task ? { ...task } : {};
    this.mode = task ? 'edit' : 'add';

    if (task) {
      this.router.navigate(['/allTasks/edit'], {
        queryParams: { itemId: task.itemId },
        state: { task },
      });
    } else {
      this.router.navigate(['/allTasks/add']);
    }
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id).subscribe({
      next: (response) => {
        if (response?.result) {
          this.toastService.showSuccess('Task deleted successfully');
          this.loadTasks();
        } else {
          this.toastService.showError('Failed to delete the task');
        }
      },
      error: (error) => {
        console.error('Error deleting task', error);
        this.toastService.showError(
          'An error occurred while deleting the task'
        );
      },
    });
  }

  checkRoute() {
    const currentRoute = this.router.url;
    if (currentRoute.includes('allTasks')) {
      this.isAllTasksRoute = true;
    } else {
      this.isAllTasksRoute = false;
    }
  }
}
