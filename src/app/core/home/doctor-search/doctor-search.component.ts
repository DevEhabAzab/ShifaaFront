import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import {ChangeDetectionStrategy, signal} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu'; // Import MatMenu if needed
import { Router } from '@angular/router';
import { HttpService } from 'src/services/http/http.service';


@Component({
  selector: 'app-doctor-search',
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.scss']
})
export class DoctorSearchComponent implements OnInit {
  public routes = routes;
  searchByName: string='';


  search() {
    // Handle search action
    console.log('Searching for:', this.searchByName);
  }
  selectSpeaclities: any = [];
  selectCities: any = [];
  selectAreas:any= [];

  selectedArea:any;
  selectedCity:any;
  selectedSpeaclity:any;

  constructor(private router: Router,public http:HttpService) { }

  ngOnInit(): void {
    this.http.get('City/GetCitiesWithCountryID?c_id=887').subscribe(cities => {
       this.selectCities = cities;
    });

  // this.http.get('Area/GetAllAreas').subscribe(areas =>{
  //   console.log(areas);
  //   this.selectAreas = areas;
  //   });

  
  this.http.get('Major/GetAllMajors').subscribe(specalizations =>{
    console.log(specalizations);
    this.selectSpeaclities = specalizations;
  });
  }

  navigateToSearch(): void {
    // Placeholder for search functionality
    const queryParams: any = {};

    if (this.selectedSpeaclity?.majorId) {
      queryParams.selectedSpeaclity = this.selectedSpeaclity.majorId;
    }

    if (this.selectedArea?.areaId) {
      queryParams.area = this.selectedArea.areaId;
    }

    if (this.selectedCity?.cityId) {
      queryParams.gov = this.selectedCity.cityId;
    }

    if (this.searchByName) {
      queryParams.drName = this.searchByName;
    }

    this.router.navigate(['/home/home-page'], { queryParams });
    console.log(`Searching for ${JSON.stringify( this.selectedSpeaclity)} doctor in ${this.selectedArea}`);
  }
  onSpeaclitSelected(item:any){
    this.selectedSpeaclity=item//.majorId;
    console.log(item)
    //console.log(item.majorId)
    //console.log(item.cityId)
    //console.log(item.areaId)
  }
  onCitySelected(item:any){
    this.selectedCity=item//.cityId;

    if(this.selectedCity)
      {
        this.http.get('Area/GetAreaWithCityID?city_id='+this.selectedCity.cityId).subscribe(data => {
          console.log(data);  
          this.selectAreas = data;
        });
      }else{
        this.selectAreas = [];
      }
    console.log(item)
    //console.log(item.majorId)
    //console.log(item.cityId)
    //console.log(item.areaId)
  }
  onAreaSelected(item:any){
    this.selectedArea=item//.areaId;
    console.log(item)
    //console.log(item.majorId)
    //console.log(item.cityId)
    //console.log(item.areaId)
  }
}