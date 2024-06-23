import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { HttpService } from 'src/services/http/http.service';
interface data {
  value: string ;
}
@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent {
  public routes = routes;
  public selectedValue !: string  ;

  constructor(private httpService: HttpService)
  {

  }
  selectedList1: data[] = [
    {value: 'Select Purchase by'},
    {value: 'Bernardo James'},
    {value: 'Galaviz Lalema'},
    {value: 'Tarah Williams'},
  ];
  selectedList2: data[] = [
    {value: 'Select Paid by'},
    {value: 'Paypal'},
    {value: 'Cheque'},
    {value: 'Debit Card'},
  ];
  selectedList3: data[] = [
    {value: 'Select Payment Status'},
    {value: 'Approved'},
    {value: 'Rejected'},
    {value: 'Pending'},
  ];

  postData(): void {
    const postData = {
      key1: 'value1',
      key2: 'value2'
    };

}
onSubmit(form: any):void {
  console.log(form);
  console.log(this.httpService.post('sad',form));
  this.httpService.post<any>('your-endpoint', {
    "dasd":'dasda'
  })
  .subscribe(
    data => {
      console.log('POST request successful', data);
    },
    error => {
      console.error('Error with POST request', error);
    }
  );
}
}
