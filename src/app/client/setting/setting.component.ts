import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user_id: any;
  type_user:any;
  dataCliente='client';
  Cards_user: Array<any> = [];

  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.user_id=localStorage.getItem('currentUser')
    this.type_user=localStorage.getItem('typeofuser')
    this.getCard()
    console.log(this.type_user);
    
    
  }
  getCard(){
    if(this.type_user == this.dataCliente){
      this.getCardsClient(this.user_id).subscribe((data: any) => {
      this.Cards_user = data;
      console.log(data);
      console.log("error cliente");
    });
    }
    else{
      this.getCardsDriver(this.user_id).subscribe((data: any) => {
      this.Cards_user = data;
      console.log(data);
      console.log("error driver")
    });
    }
    console.log("error");
  }
  getCardsClient(id: any) {
    return this.http.get(`${this.basePath}paymentMethod?ClientId=${id}`);
  }
  getCardsDriver(id: any) {
    return this.http.get(`${this.basePath}paymentMethod?DriverId=${id}`);
  }
  DeleteCard(id: number) {
    return this.http.delete(`${this.basePath}paymentMethod/${id}`);
  }
  deleteItem(id: number) {
    this.DeleteCard(id).subscribe((data:any) => {
      console.log(data);
      this.ngOnInit();

    // this.router.navigate(['/login']);


    });
    
  }

}