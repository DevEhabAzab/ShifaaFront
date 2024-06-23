import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/services/http/http.service';
import { NotificationService } from 'src/services/snack/notification.service';
import { routes } from 'src/app/shared/routes/routes';
import { searchDocotr, TimeDim } from 'src/app/shared/models/models';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface data {
  value: string;
}

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  public routes = routes;
  doctorId: any;
  mobile: string = '';
  date: any;
  calendar: any;
  selectedDateKey: any;
  selectedTime: any;
  fullName: string = '';
  email: string = '';
  public doctorList: any = [];
  public pagedDocs: Array<searchDocotr> = [];
  public combinedDates: any[] = [];
  public combinedTimeSlots: TimeDim[] = [];
  reservationDate:any='';
  daysOfWeek = [
    { dayKey: 1, dayName: 'Monday' },
    { dayKey: 2, dayName: 'Tuesday' },
    { dayKey: 3, dayName: 'Wednesday' },
    { dayKey: 4, dayName: 'Thursday' },
    { dayKey: 5, dayName: 'Friday' },
    { dayKey: 6, dayName: 'Saturday' },
    { dayKey: 7, dayName: 'Sunday' }
  ];

  constructor(
    private route: ActivatedRoute,
    private http: HttpService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.queryParamMap.get('id');
    console.log('Doctor ID:', this.doctorId); // Debugging
    this.fetchDoctorData(this.doctorId).then(() => {
      this.combineTimeSlots();
    });
  }

  fetchDoctorData(doctorId: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get('SearchDoc/GetWithDrID?drID=' + doctorId).subscribe(drList => {
        this.doctorList = drList;
        console.log('Doctor List:', this.doctorList); // Debugging
        const fetchPromises = this.doctorList.map((doctor: any) => {
          return this.fetchDoctorTimeSlots(doctor.rowId);
        });
        Promise.all(fetchPromises).then(() => {
          resolve();
        }).catch(err => reject(err));
      });
    });
  }

  fetchDoctorTimeSlots(doctorId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const doctor = this.doctorList.find((doc: searchDocotr) => doc.rowId === doctorId);
      if (doctor) {
        this.http.get(`TimeSlots/GetWithPeronID?personId=${doctorId}`).subscribe((timeSlots: any) => {
          if (timeSlots) {
            doctor.TimeSlots = timeSlots;
            if (doctor.TimeSlots && doctor.TimeSlots.length > 0) {
              const timeDimPromises = doctor.TimeSlots.map((slot: any) => {
                const matchingDay = this.daysOfWeek.find(day => day.dayKey === slot['dateKey']);
                if (matchingDay) {
                  slot.dateKey = matchingDay.dayName;
                }
                const timeKeys = [slot.timeKeyFrom, slot.timeKeyTo];
                return this.fetchTimeDim(timeKeys, slot);
              });
              Promise.all(timeDimPromises).then(() => {
                resolve();
              }).catch(err => reject(err));
            } else {
              resolve();
            }
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  fetchTimeDim(timeKey: any[], slot: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post('Time/GetMutliTimeDimID', timeKey).subscribe((result: any) => {
        slot.TimeDim = result;
        resolve();
      }, err => reject(err));
    });
  }

  combineTimeSlots() {
    this.combinedDates = [];
    this.combinedTimeSlots = [];

    this.doctorList.forEach((doctor: any) => {
      doctor.TimeSlots?.forEach((slot: any) => {
        const matchingDay = this.daysOfWeek.find(day => day.dayKey === slot['dateKey']);
        if (matchingDay) {
          slot.dateKey = matchingDay.dayName;
        }
        this.combinedDates.push(slot.dateKey);
        slot.TimeDim?.forEach((timeDim: TimeDim) => {
          this.combinedTimeSlots.push(timeDim);
        });
      });
    });

    // Remove duplicates from combinedDates
    this.combinedDates = [...new Set(this.combinedDates)];
    console.log('Combined Dates:', this.combinedDates); // Debugging
    console.log('Combined Time Slots:', this.combinedTimeSlots); // Debugging
  }

  getNextDateOfDay(dayName: string): string {
    const currentDate = new Date();
    const currentDayIndex = currentDate.getDay(); // Sunday - Saturday : 0 - 6
    const targetDayIndex = this.daysOfWeek.find(day => day.dayName === dayName)?.dayKey;
    
    if (targetDayIndex === undefined) {
      throw new Error('Invalid day name');
    }

    let daysUntilNextDay = targetDayIndex - currentDayIndex;
    if (daysUntilNextDay <= 0) {
      daysUntilNextDay += 7;
    }

    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + daysUntilNextDay);
    return this.getFormattedDate(nextDate);
  }
  onChangeDay()
  {
    const selectedDayName = this.selectedDateKey;
    const nextSelectedDayDate = this.getNextDateOfDay(selectedDayName);
    this.reservationDate = nextSelectedDayDate;
  }
  onSubmit(form: any) {
    if (!this.fullName || !this.mobile || !this.selectedDateKey || !this.selectedTime || !this.doctorList) {
      console.log('Please fill in all the required fields.');
      this.notificationService.showError("Please Enter Name, Mobile And select Date and Time");
      return;
    } else {
      var personObj = {
        'persoonName': this.fullName,
        'personType': 10,
        'personTitle': null,
        'personDegree': null,
        'personMobile': this.mobile,
        'personMajor': null,
        'personJob': null,
        'personEmail': this.email,
        'personNationality': null
      }

      this.http.post('Person/AddPerson', personObj).subscribe(res => {
        this.http.get('Person/GetMaxPersonID').subscribe(personID => {
          const maxPersonId = personID;
          console.log(maxPersonId);

          const selectedDayName = this.selectedDateKey;
          const nextSelectedDayDate = this.getNextDateOfDay(selectedDayName);
          console.log(nextSelectedDayDate)
          let bookingTime = {
            hour: Number(this.selectedTime.timeHh),
            minute: Number(this.selectedTime.timeMm),
            second: 0
          };

          let bookingObj = {
            "bookingDate": nextSelectedDayDate,
            "bookingTime": this.selectedTime.timeHh + ":" + this.selectedTime.timeMm + ":" + "00",
            "bookedBy": maxPersonId,
            "bookedInCenter": this.doctorList[0].centerId,
            "bookingPrice": this.doctorList[0].visitingPrice,
            "bookingDiscount": null,
            "priceCurrency": null,
            "bookingStatus": 5,
            "DoctorId":this.doctorId
          }

          console.log(bookingObj);

          this.http.post('Booking/CreateBooking', bookingObj).pipe(
            catchError(error => {
              console.error('Error occurred:', error);
              this.notificationService.showError('something went wrong please try again!');
              return of([]);
            })
          ).subscribe((filteredDocs: any) => {
            console.log(filteredDocs);
            this.notificationService.showSuccess("Dear, " + this.fullName + " You have booked successfully!");
          });
        })
      });
    }

    console.log(this.fullName);
    console.log(this.mobile);
    console.log(this.selectedDateKey);
    console.log(this.selectedTime);
    console.log(this.doctorList);
  }

  getFormattedDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
