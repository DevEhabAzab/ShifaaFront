import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';
import { HttpService } from 'src/services/http/http.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public routes = routes;
  public CustomControler!: number | string | boolean ;
  public passwordClass  = false;
  public confirmPasswordClass  = false
  public isValidConfirmPassword = false;

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router:Router,private auth: AuthService,private http:HttpService) { }

  
  submit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
      // this.auth.login();
      var authObj = {
        'email':this.form.value.email,
        'password':this.form.value.password
      }
     
      


      this.http.post('AuthManagment/Register', authObj)
      .subscribe((response:any) => {
        console.log('Form submitted successfully', response);
        alert('Successfuly Added New Person');
        const decodedToken:any = jwtDecode(response.token);
        var personObj={
          'persoonName':this.form.value.fullName,
          'personType':10,
          'personTitle':null,
          'personDegree':null,
          'personMobile':null,
          'personMajor':null,
          'personJob':null,
          'personEmail':this.form.value.email,
          'personNationality':null,
          'personAspnetUserId':decodedToken.Id,
          'changeCurrentInd':'Y'

        }
      console.log("person Obj",personObj)
        this.http.post('Person/AddPerson',personObj).subscribe(response=>{
          console.log("Person Added",response);
          // this.router.navigate([this.routes.adminDashboard]);
          this.auth.login(authObj);
        },error => {
          console.error('Error',error);
        })
        // this.router.navigate([this.routes.adminDashboard]);
      }, error => {
        console.error('Error submitting form', error);
      });
      console.log(this.form.value.fullName);
    }
  }
  passwordFunc(){
    this.passwordClass = !this.passwordClass
  }
  confirmPasswordFunc(){
    this.confirmPasswordClass = !this.confirmPasswordClass
  }
}
