import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { er } from '@fullcalendar/core/internal-common';
import { routes } from 'src/app/shared/routes/routes';
import { HttpService } from 'src/services/http/http.service';

@Component({
  selector: 'app-assgin-specialist',
  templateUrl: './assgin-specialist.component.html',
  styleUrls: ['./assgin-specialist.component.scss']
})
export class AssginSpecialistComponent {
  public routes = routes;
  constructor(
    private http: HttpService,
    private router: Router,
  ) {}

  selectedType: any = [];
  selectedValue: any;

  contactPerson:any=[];
  contactPersons:any=[];

  selectTimes:any=[];
  selectedTimeFrom:any;
  selectTimeTo:any;

  selectDates:any=[];
  selectedDate:any;

 selectedDay: any=[];
  daysOfWeek = [
    { dayKey: 1, dayName: 'Monday' },
    { dayKey: 2, dayName: 'Tuesday' },
    { dayKey: 3, dayName: 'Wednesday' },
    { dayKey: 4, dayName: 'Thursday' },
    { dayKey: 5, dayName: 'Friday' },
    { dayKey: 6, dayName: 'Saturday' },
    { dayKey: 7, dayName: 'Sunday' }
  ];

  selectCenters:any=[];
  selectedCenter:any;
  ngOnInit(){
      this.http.get('Type/GetActiveJoinTypes').subscribe(data => {
        console.log(data);
        this.selectedType = data;
      });

      this.http.get('Person/GetPersonByTypeID').subscribe(persons =>{
        console.log(persons);
        this.contactPersons = persons;
      });

      this.http.get('Time/GetAllTimeSlots').subscribe(times=>
        {
            console.log(times);
            this.selectTimes = times;
        }
      );
      
      this.http.get('Date/GetAllDateFromToday').subscribe(times=>
        {
            console.log(times);
            this.selectDates = times;
        }
      );
      
      this.http.get('Center/GetAllCenters').subscribe(times=>
        {
            console.log(times);
            this.selectCenters = times;
        }
      );
  }

 
onSubmit(form: any) {
  if (form.valid) {
    console.log('Form Data:', form.value); // Debug log to see form data

    console.log(this.contactPerson);
    const today = new Date();
    const todayDate = today.toISOString().split('T')[0]; // Format: yyyy-MM-dd
    console.log(this.selectedValue);

    console.log(this.contactPerson);
    console.log(this.selectedDay);
    for(var i in this.contactPerson)
      {
            console.log(this.contactPerson[i]);
            var postData = {
              'visitingPrice':form.value.price,
              'centerId':this.selectedCenter,
              'personId':this.contactPerson[i],
              'priceCurrency':840,
              'joinDate':todayDate,
              'joiningType':this.selectedValue,
              'leavingDate':null,
              'changeCurrentInd':'Y'
            };
            this.http.post('PersonInCenter/AddPersonInCenter', postData)
              .subscribe(response => {
                console.log('Form submitted successfully', response);
                
                this.http.get('PersonInCenter/GetMaxRowIDPersonInCneter').subscribe(
                  response=>{ 

                    var max_row_id = response;
                    console.log('maxrowid',max_row_id);
                    for(var j in this.selectedDay)
                      {

                        var objToSend={
                            'timeKeyTo':this.selectTimeTo,
                            'timeKeyFrom':this.selectedTimeFrom,
                            'personsInCenterId':max_row_id,
                            'dateKey':this.selectedDay[j]//change this to the param coantins the day when scaffold which means to j here
                        }
                        this.http.post('TimeSlots/AddTimeSlot',objToSend).subscribe(
                          response=>{
                              console.log('inserted successfully',response);
                          },error=>{
                              console.log(error);
                          }
                        );

                      }

                  },
                  error=>{
                    console.log(error);
                  }
                );

                //this.router.navigate([this.routes.addCenter]);
              }, error => {
                console.error('Error submitting form', error);
              });

          }

      }
 
  }
}

