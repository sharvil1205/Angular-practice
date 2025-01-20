import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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
    MatIconModule,
    CommonModule,
  ],
  standalone: true,
})
export class TaskDialogReactiveComponent implements OnInit {
  taskForm!: FormGroup;
  @ViewChild('taskNameInput') taskNameInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskDialogReactiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: any; mode: 'edit' | 'add' }
  ) {}

  ngOnInit(): void {
    const initialTags = this.data.task?.tags
      ? this.data.task.tags.split(',')
      : [];

    this.taskForm = this.fb.group({
      taskName: [this.data.task?.taskName || '', Validators.required],
      taskDescription: [
        this.data.task?.taskDescription || '',
        Validators.required,
      ],
      dueDate: [this.data.task?.dueDate || ''],
      tags: this.fb.array([]),
    });

    initialTags.forEach((tag: string | undefined) => this.addTag(tag));
  }

  get tags() {
    return this.taskForm.get('tags') as FormArray;
  }

  addTag(initialValue: string = '') {
    const tagForm = this.fb.group({
      value: [initialValue, Validators.required],
    });
    this.tags.push(tagForm);
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;

      const tagsString = formValue.tags
        .map((tag: { value: string }) => tag.value)
        .join(', ');

      const updatedTask = {
        ...this.data.task,
        ...formValue,
        tags: tagsString,
      };

      this.dialogRef.close(updatedTask);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }

  ngAfterViewInit(): void {
    this.taskNameInput.nativeElement.focus();
  }

  ngDoCheck(): void {
    if (this.taskForm.get('taskName')?.dirty) {
      console.log('Task name has been modified.');
    }
  }
  ngAfterContentChecked(): void {
    const tagsArray = this.taskForm.get('tags') as FormArray;

    if (tagsArray.length > 3) {
      console.log('Too many tags!');
    }
  }
  // ngAfterViewChecked(): void {
  //   const hasErrors =
  //     this.taskForm.get('taskName')?.hasError('required') ||
  //     this.taskForm.get('taskDescription')?.hasError('required');

  //   console.log('Error state changed:', hasErrors);
  // }
}
