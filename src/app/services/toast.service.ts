import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/shared/toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['toast-success'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showError(message: string): void {
    this.snackBar.openFromComponent(ToastComponent, {
      data: { message },
      duration: 3000,
      panelClass: ['toast-error'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
