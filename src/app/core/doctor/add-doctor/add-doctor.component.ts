import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { HttpService } from 'src/services/http/http.service';
import { jwtDecode } from 'jwt-decode';

interface data {
  value: string ;
}
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent implements OnInit{
  public routes = routes;
  public selectedValue !: string ;
  constructor(public http:HttpService){}



  // for types lkp table
  public selectTypes:any=[];
  public selectedType:any;
  
  // for title lkp table
  public selectTitles:any=[];
  public selectedTitle:any;


  //for degree lkp table
  public selectDegrees:any=[];
  public selectedDegree:any;

  //for Magor Lkp Table
  public selectMajors:any= [];
  public selectedMajor:any;

  //for jobs lkp Table
  public selectJobs:any=[];
  public selectedJob:any;

  //for country lkp table
  public selectCountries:any=[];
  public selectedCountry:any;

  ngOnInit(): void {

this.http.get('Type/GetActiveTypesPerson').subscribe(data => {
        console.log(data);
        this.selectTypes = data;
      });
      this.http.get('Country/GetAllCountries').subscribe(countries => {
          console.log(countries);
          this.selectCountries = countries;
      });

      this.http.get('Title/GetAllTitles').subscribe(titles =>{
        console.log(titles);
        this.selectTitles = titles;
      });

      
      this.http.get('Degree/GetAllDegrees').subscribe(degree =>{
        console.log(degree);
        this.selectDegrees = degree;
      });
      
    
      this.http.get('Major/GetAllMajors').subscribe(major =>{
        console.log(major);
        this.selectMajors = major;
      });

      this.http.get('Job/GetAllJobs').subscribe(job =>{
        console.log(job);
        this.selectJobs = job;
      });
  }

  onSubmitForm(form: any)
  {

    if(form.valid)
    {

      
      if(form.value.password===form.value.confirmpassword)
        {
            if(!form.value.password || !form.value.confirmpassword)
              {
                alert('Password cant be empty');
              }else{

                var authObj = {
                  'email':form.value.email,
                  'password':form.value.password
                }
            

                this.http.post('AuthManagment/Register', authObj)
                .subscribe((response:any) => {
                  console.log('Form submitted successfully', response);
                  const decodedToken:any = jwtDecode(response.token);

                  var personObj={
                    'persoonName':form.value.pname,
                    'personType':this.selectedType,
                    'personTitle':this.selectedTitle,
                    'personDegree':this.selectedDegree,
                    'personMobile':form.value.mobile,
                    'personMajor':this.selectedMajor,
                    'personJob':this.selectedJob,
                    'personEmail':form.value.email,
                    'personNationality':this.selectedCountry,
                    'personAspnetUserId':decodedToken.Id,
                    'changeCurrentInd':'Y'
                  }
                  console.log("registration res",response);
                  console.log("person Obj",personObj);
                  console.log("decoded token Obj",decodedToken);
                  alert('Successfuly Added New Person');
                  this.http.post('Person/AddPerson',personObj).subscribe(response=>{
                    console.log("Person Added",response);
                    // this.router.navigate([this.routes.adminDashboard]);

                  },error => {
                    console.error('Error',error);
                  })
                  // this.router.navigate([this.routes.adminDashboard]);
                }, error => {
                  console.error('Error submitting form', error);
                });
              }

        }else{
          alert('Please Enter Same password for the user');
        }
      console.log(form.value);



    }


  }
  selectedList1: data[] = [
    {value: 'Select Department'},
    {value: 'Orthopedics'},
    {value: 'Radiology'},
    {value: 'Dentist'},
  ];
  selectedList2: data[] = [
    {value: 'Select City'},
    {value: 'Alaska'},
    {value: 'Los Angeles'},
  ];
  selectedList3: data[] = [
    {value: 'Select Country'},
    {value: 'Usa'},
    {value: 'Uk'},
    {value: 'Italy'},
  ];
  selectedList4: data[] = [
    {value: 'Select State'},
    {value: 'Alaska'},
    {value: 'California'},
  ];
}
