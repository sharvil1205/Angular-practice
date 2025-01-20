import {
  Component,
  Inject,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  SimpleChanges,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
})
export class TaskDialogComponent {
  @Input() task: any = {};
  @Input() mode: 'edit' | 'add' = 'add';
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();
  private initialTask: string = '';

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = data?.task || {};
    this.mode = data?.mode || 'add';
  }

  onSave(): void {
    this.save.emit(this.task);
    this.dialogRef.close(this.task);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isTaskModified(): boolean {
    return JSON.stringify(this.task) !== this.initialTask;
  }

  ngOnInit() {
    this.initialTask = JSON.stringify(this.task);
  }

  ngAfterContentInit(): void {
    console.log('Content has been initialized');
    const taskNameInput = document.querySelector(
      '#taskNameInput'
    ) as HTMLInputElement;
    if (taskNameInput) {
      taskNameInput.focus();
    }
  }
}
