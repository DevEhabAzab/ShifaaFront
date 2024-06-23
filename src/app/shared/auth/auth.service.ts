import { Injectable ,Renderer2, RendererFactory2, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpService } from 'src/services/http/http.service';
import { jwtDecode } from 'jwt-decode';
import { LoginFailedModalComponent } from 'src/app/core/login-failed-modal/login-failed-modal.component';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ModalComponent } from 'src/app/core/modal/modal.component';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpService,
    private dialog: MatDialog
  ) {}

  public login(loginData:any): void {
    this.http.post('AuthManagment/Login',loginData).subscribe(
      (response: any) => {
        if(response.result == true)
          {
            // sessionStorage.setItem('token',response.token);
            sessionStorage.setItem('refreshToken',response.refreshToken);
            localStorage.setItem('authenticated', 'true');
            const decodedToken:any = jwtDecode(response.token);
            sessionStorage.setItem('roles', JSON.stringify(decodedToken.role));
            localStorage.setItem('userID', decodedToken.Id);


            let roles = decodedToken.role
            console.log(decodedToken);
            this.redirectBasedOnRole(decodedToken);
          }
      },
      error => {
        this.showLoginFailedModal();
        console.error('Error submitting form', error);
      }
    );
    // console.log(logInResult);
        // this.http.post('AuthManagment/Login',loginData);
    // localStorage.setItem('authenticated', 'true');
    //this.router.navigate([routes.adminDashboard]);
  }

  private redirectBasedOnRole(decodedToken: any): void {
    if (decodedToken.AdminDashboard==='AdminDashboard') {
      this.router.navigate([routes.adminDashboard]);
    } else if (decodedToken.DoctorDashboard==='DoctorDashboard') {
      this.router.navigate([routes.doctorDashboard]);
    } else if(decodedToken.PatientDashBoard==='PatientDashBoard')
      {
        this.router.navigate([routes.patientDashboard]);
      }
     else {
      this.router.navigate(['default-page']); // Navigate to a default page if no roles match
    }
  }
  
  private showLoginFailedModal(): void {
    
    this.dialog.open(LoginFailedModalComponent, {
      width: '400px',
      disableClose: false,
      data: { h2: "Wrong Username or password" },
    });
  }
  
}
