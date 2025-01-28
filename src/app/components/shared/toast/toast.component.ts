import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarModule,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  imports: [MatSnackBarModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  message: string = '';

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }) {
    this.message = data.message;
  }
}
