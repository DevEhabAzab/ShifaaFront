import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  showSuccess(message:string)
  {
    this.snackBar.open(message,'Close',{
        duration:3500,
        horizontalPosition:'center',
        verticalPosition:'top',
        panelClass:['success-snackbar'] // it can be info-snackbar or warning-snackbar
    });
  }
}
