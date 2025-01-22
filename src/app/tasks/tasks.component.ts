import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { TaskDialogReactiveComponent } from '../task-dialog-reactive/task-dialog-reactive.component';
import { completedTasks, overdueTasks, upcomingTasks } from '../../constants';

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
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent {
  @Input() tasks: any[] = [];

  selectedTask: any = null;
  dialogMode: 'edit' | 'add' = 'add';
  useReactiveDialog = false;
  isAllTasksRoute: boolean = false;
  isDialogOpen = false;

  constructor(private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.checkRoute();
    if (this.tasks.length === 0) {
      this.tasks = [...upcomingTasks, ...completedTasks, ...overdueTasks];
    }
  }

  openTaskDialog(task?: any): void {
    this.selectedTask = task ? { ...task } : {};
    this.dialogMode = task ? 'edit' : 'add';

    const dialogComponent = TaskDialogReactiveComponent;

    const dialogRef = this.dialog.open(dialogComponent as any, {
      data: { task: this.selectedTask, mode: this.dialogMode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.saveTask(result);
      }
    });
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
  }

  editTask(task: any): void {
    this.openTaskDialog(task);
  }

  addTask(): void {
    this.openTaskDialog();
  }

  openTaskPage(task?: any): void {
    this.selectedTask = task ? { ...task } : {};
    this.dialogMode = task ? 'edit' : 'add';

    if (task) {
      this.router.navigate(['/allTasks', task.itemId, 'edit'], {
        state: { task },
      });
    } else {
      this.router.navigate(['/allTasks/add'], {
        state: { task: { taskName: '', dueDate: null } },
      });
    }
  }

  deleteTask(itemId: number): void {
    this.tasks = this.tasks.filter((task) => task.itemId !== itemId);
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
