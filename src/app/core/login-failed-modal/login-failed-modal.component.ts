import { Component,Inject  } from '@angular/core';
import { MatDialogRef ,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-login-failed-modal',
  templateUrl: './login-failed-modal.component.html',
  styleUrls: ['./login-failed-modal.component.scss']
})
export class LoginFailedModalComponent {
  constructor(public dialogRef: MatDialogRef<LoginFailedModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any
) {console.log(this.data.h2);}
  
  h2 = this.data.h2;
  onClose(): void {
    this.dialogRef.close();
  }

}
