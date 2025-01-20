import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepickerModule,
  MatDateRangePicker,
} from '@angular/material/datepicker';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-dialog-reactive',
  templateUrl: './task-dialog-reactive.component.html',
  styleUrls: ['./task-dialog-reactive.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    CommonModule,
  ],
})
export class TaskDialogReactiveComponent implements OnInit {
  taskForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogReactiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: any; mode: 'edit' | 'add' }
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      taskName: [this.data.task?.taskName || '', Validators.required],
      taskDescription: [
        this.data.task?.taskDescription || '',
        Validators.required,
      ],
      dueDate: [this.data.task?.dueDate || ''],
      tags: [this.data.task?.tags || ''],
    });
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const updatedTask = {
        ...this.data.task,
        ...this.taskForm.value,
      };
      this.dialogRef.close(updatedTask);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
