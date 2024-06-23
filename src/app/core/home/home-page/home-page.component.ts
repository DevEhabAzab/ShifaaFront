import { Component, Input, OnInit } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { DataService } from 'src/app/shared/data/data.service';
import { doctorlist, pageSelection, searchDocotr,TimeDim } from 'src/app/shared/models/models';
import { HttpService } from 'src/services/http/http.service';
import { blogs } from 'src/app/shared/models/models';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/services/snack/notification.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  public routes = routes;
  
  selectedArea:any;
  selectedCity:any;
  selectedSpeaclity:any;
  daysOfWeek = [
    { dayKey: 1, dayName: 'Monday' },
    { dayKey: 2, dayName: 'Tuesday' },
    { dayKey: 3, dayName: 'Wednesday' },
    { dayKey: 4, dayName: 'Thursday' },
    { dayKey: 5, dayName: 'Friday' },
    { dayKey: 6, dayName: 'Saturday' },
    { dayKey: 7, dayName: 'Sunday' }
  ];
  selectAreas:any=[];
  selectCities:any=[];
  selectSpeaclities:any=[];
  public doctorList:any=[];
  public blogs: Array<blogs> = [];
  public pagedBlogs: Array<blogs> = [];
  public pageSize: number = 100;
  public currentPage: number = 0;
  public pagedDocs:Array<searchDocotr>=[];

  constructor(public data : DataService,public http:HttpService,private notificationService: NotificationService
  ){

  }

  ngOnInit(): void {
    this.blogs = this.data.blogs;
    console.log(this.blogs);
    this.setPagedBlogs();
    
    this.http.get('SearchDoc/GetAll').subscribe(drList => 
      {
        console.log(drList);
        this.doctorList = drList;
        this.setPagedDoc();
        for (const doctor of this.doctorList) {
          this.fetchDoctorTimeSlots(doctor.rowId);
        }
      }
    );
    this.http.get('City/GetAllCities').subscribe(cities => {
      console.log(cities);
      this.selectCities = cities;
  });

  this.http.get('Area/GetAllAreas').subscribe(areas =>{
    console.log(areas);
    this.selectAreas = areas;
  });

  
  this.http.get('Major/GetAllMajors').subscribe(specalizations =>{
    console.log(specalizations);
    this.selectSpeaclities = specalizations;
  });
  
  }

  fetchDoctorTimeSlots(doctorId: number) {
    const doctor = this.doctorList.find((doc: searchDocotr) => doc.rowId === doctorId);
    if (doctor) {
      this.http.get(`TimeSlots/GetWithPeronID?personId=${doctorId}`).subscribe((timeSlots: any) => {
        if (timeSlots) {
          doctor.TimeSlots = timeSlots;
          if (doctor.TimeSlots && doctor.TimeSlots.length > 0) {
            for (let slot of doctor.TimeSlots) {
              // Find the matching day
              console.log();
              const matchingDay = this.daysOfWeek.find(day => day.dayKey === slot['dateKey']);
              console.log(matchingDay);
              if (matchingDay) {
                slot.dateKey = matchingDay.dayName; // Assign day name to dateKey
              }
              const timeKeys = [slot.timeKeyFrom, slot.timeKeyTo];
              this.fetchTimeDim(timeKeys, slot);
            }
          }
        }
      });
    }
  }
  
  fetchTimeDim(timeKey: any[], slot: any) {
    this.http.post('Time/GetMutliTimeDimID', timeKey).subscribe((result: any) => {
      slot.TimeDim = result; // Correctly assign TimeDim to the corresponding slot
      console.log(result);
    });
  }
  
 
  
  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.setPagedDoc();
  }

  setPagedBlogs(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedBlogs = this.blogs.slice(startIndex, endIndex);
  }
  setPagedDoc():void{
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedDocs = this.doctorList.slice(startIndex, endIndex);
  }
  onSubmit()
  {
    console.log('search');
  }

  onCityChange()
  {

    if(this.selectedCity)
      {
        this.http.get('Area/GetAreaWithCityID?city_id='+this.selectedCity).subscribe(data => {
          console.log(data);  
          this.selectAreas = data;
        });
      }else{
        this.selectAreas = [];
      }

  }


  search(): void {
    const params = {
      cityId: this.selectedCity,
      areaId: this.selectedArea,
      specialityId: this.selectedSpeaclity
    };

    this.http.post('SearchDoc/GetWithFilters', params).pipe(
      catchError(error => {
        console.error('Error occurred:', error);
        this.ngOnInit();
        this.notificationService.showError('Failed to fetch search please provide city,area or specality');

        // You can also use a notification service to show the error to the user
        // this.notificationService.showError('Failed to fetch data');
        return of([]); // Return an empty array or any fallback value
      })
    ).subscribe((filteredDocs: any) => {
      console.log(filteredDocs);
      this.doctorList = filteredDocs;
      this.setPagedDoc();
      for (const doctor of this.doctorList) {
        this.fetchDoctorTimeSlots(doctor.rowId);
      }

    });
  }
}
