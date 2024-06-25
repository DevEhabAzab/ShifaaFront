import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/services/http/http.service';
import { L } from '@fullcalendar/list/internal-common';

@Component({
  selector: 'app-add-center',
  templateUrl: './add-center.component.html',
  styleUrls: ['./add-center.component.scss']
})
export class AddCenterComponent implements OnInit{
  public routes = routes;
  constructor(
    private http: HttpService,
    private router: Router,
  ) {}


  selectedType: any = [];
  selectedValue: any;

  selectedCountries :any=[];
  selectedCountry:any;

  cities : any=[];
  city:any;

  areas:any=[];
  area:any;

  centerStatus:any;
  centerStatuss:any =[];

  contactPerson:any;
  contactPersons:any=[];
  ngOnInit(){
      this.http.get('Type/GetActiveTypesCenter').subscribe(data => {
        console.log(data);
        this.selectedType = data;
      });
      this.http.get('Country/GetAllCountries').subscribe(countries => {
          console.log(countries);
          this.selectedCountries = countries;
      });

      this.http.get('Person/GetAllPerson').subscribe(persons =>{
        console.log(persons);
        this.contactPersons = persons;
      });

      
      this.http.get('Status/GetAllStatus').subscribe(statuss =>{
        console.log(statuss);
        this.centerStatuss = statuss;
      });
      
  }

  onCountryChange() {

    if (this.selectedCountry) {
      this.http.get('City/GetCitiesWithCountryID?c_id='+this.selectedCountry).subscribe(data => {
        console.log(data);
        this.cities = data;
      });
    } else {
      this.cities = [];
    }
  }

  onCityChange()
  {

    if(this.city)
      {
        this.http.get('Area/GetAreaWithCityID?city_id='+this.city).subscribe(data => {
          console.log(data);  
          this.areas = data;
        });
      }else{
        this.areas = [];
      }

  }

onSubmit(form: any) {
  if (form.valid) {
    console.log('Form Data:', form.value); // Debug log to see form data

    console.log(this.centerStatus);
    console.log(this.city);
    console.log(this.contactPerson);
    console.log(this.area);
    console.log(this.selectedCountry);
    console.log(this.selectedValue);
    var postData = {
      'centerName':form.value.cname,
      'centerPhone':form.value.cphone,
      'centerMobile':form.value.cmobile,
      'centerDesc':form.value.desc,
      'centerLocationLon':form.value.long,
      'centerLocationLat':form.value.lat,
      'centerCountry':this.selectedCountry,
      'centerCity':this.city,
      'centerArea':this.area,
      'centerAddress':form.value.address,
      'contactPerson':this.contactPerson,
      'centerStatus':this.centerStatus,
      'centerType':this.selectedValue,
      'changeCurrentInd':'Y'
    };
    console.log(JSON.stringify(postData))
    this.http.post('Center/AddCenter', postData)
      .subscribe(response => {
        console.log('Form submitted successfully', response);
        alert('Successfuly Added New Center');
        this.router.navigate([this.routes.adminDashboard]);
      }, error => {
        console.error('Error submitting form', error);
      });
  }
}
}
 