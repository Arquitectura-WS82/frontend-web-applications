import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, driver_ranked } from '../../../models/user/user'
import {catchError, Observable, retry, throwError} from "rxjs";



@Component({
  selector: 'app-home-d',
  templateUrl: './home-d.component.html',
  styleUrls: ['./home-d.component.css']
})
export class HomeDComponent implements OnInit {
  user_id: any;
  user: any;
  user_name: string="";
  best_ranked: Array<any> = [];
  Best_ranked:Array<any> = [];
  contracts_user: Array<any> = [];
  driver_route: any;

  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }
  
  
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.user_id=localStorage.getItem('currentUser')
   // console.log(typeof localStorage.getItem('currentUser'))
    this.getRanked().subscribe((data: any) => {
    this.best_ranked = data;
    });
    console.log(localStorage.getItem('currentUser'))

    this.getContract(this.user_id).subscribe((data: any) => {
      this.contracts_user = data;
    });
    
    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data[0];
    });

    
  }


  counter(i: number) {
    return new Array(i);
  }

  getRanked() {
    return this.http.get(`${this.basePath}drivers?_sort=rating&_order=desc`);
  }

  getContralct(id:any) {
    return this.http.get(`${this.basePath}drivers?_sort=rating&_order=desc`);
  }

  getUser(id: any) {
    return this.http.get(`${this.basePath}drivers?id=${id}`);
  }

  getContract(id:any):Observable<any>{
    return this.http.get<any>(`${this.basePath}historyContracts?_expand=client&driverId=${id}`, this.httpOptions).
    pipe(
      retry(2));
  }


  
}
  


    
    
    



