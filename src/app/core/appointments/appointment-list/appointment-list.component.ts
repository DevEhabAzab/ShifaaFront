import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/shared/data/data.service';
import { pageSelection, apiResultFormat, appointmentList, BookingView } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { HttpService } from 'src/services/http/http.service';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent  implements OnInit {
  public routes = routes;
  public appointmentList: Array<appointmentList> = [];
  dataSource!: MatTableDataSource<appointmentList>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<pageSelection> = [];
  public totalPages = 0;
  public AppointMentsList: Array<appointmentList> = [];

  constructor(public data : DataService,public http:HttpService){

  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.appointmentList = [];
    this.serialNumberArray = [];
    var userId=localStorage.getItem('userID');
    console.log(sessionStorage);
    console.log(localStorage);

    console.log(userId);
    var doctorEndPoint='BookingView/GetDoctorBookings?doctorUserId=';
    var assistantEndPoint='BookingView/GetCenterBookings?assistantUserId=';
    const userRoles: string[] = JSON.parse(sessionStorage.getItem('roles') || '[]');
    if(userRoles.includes('Doctor')||userRoles.includes('Assistant')){
      this.http.get<apiResultFormat>( (userRoles.includes('Doctor')?doctorEndPoint:userRoles.includes('Assistant')?assistantEndPoint:'') +userId).subscribe((data: apiResultFormat) => {
        console.log("booking data",data)
        this.totalData = data.totalData;
        data.data.map((res: BookingView, index: number) => {
          const serialNumber = index + 1;
          if (index >= this.skip && serialNumber <= this.limit) {
            this.appointmentList.push(res);
            this.serialNumberArray.push(serialNumber);
          }
        });
        this.dataSource = new MatTableDataSource<appointmentList>(this.appointmentList);
        this.calculateTotalPages(this.totalData, this.pageSize);
      });
    }
   


  }

  onCancelClicked(bookingId:number){
    this.http.post('Booking/CancelBooking?id='+bookingId,{}).subscribe((data:any)=>{
      console.log(data)
      this.getTableData();

    }
    )
    alert('cancel id + '+bookingId)
  }
  
  onApproveClicked(bookingId:number){
    this.http.post('Booking/ApproveBooking?id='+bookingId,{}).subscribe((data:any)=>{
      console.log(data)
      this.getTableData();

    }
    )
    alert('approve id + '+bookingId)
  }

 // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.appointmentList = this.dataSource.filteredData;
  }
 
  public sortData(sort: Sort) {
    const data = this.appointmentList.slice();

    if (!sort.active || sort.direction === '') {
      this.appointmentList = data;
    } else {
      this.appointmentList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableData();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      var limit = pageSize * i;
      var skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }
}
