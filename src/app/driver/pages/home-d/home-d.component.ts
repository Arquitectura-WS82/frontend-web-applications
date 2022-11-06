import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, driver_ranked } from '../../../models/user/user';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-home-d',
  templateUrl: './home-d.component.html',
  styleUrls: ['./home-d.component.css'],
})
export class HomeDComponent implements OnInit {
  driver_id: any;
  user: any;
  user_name: string = '';
  best_ranked: Array<any> = [];
  Best_ranked: Array<any> = [];
  contracts_user: Array<any> = [];
  driver_route: any;

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.driver_id = localStorage.getItem('currentUser');
    // console.log(typeof localStorage.getItem('currentUser'))
    this.getRanked().subscribe((data: any) => {
      this.best_ranked = data;
    });
    console.log(localStorage.getItem('currentUser'));

    this.getContract(this.driver_id).subscribe((data: any) => {
      this.contracts_user = data;
    });

    this.getDriverById(this.driver_id).subscribe((data: any) => {
      this.user = data;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  getRanked() {
    return this.http.get(`${this.basePath}/drivers`);
  }

  getDriverById(id: any) {
    return this.http.get(`${this.basePath}/drivers/${id}`);
  }

  getContract(id: any): Observable<any> {
    return this.http
      .get<any>(
        `${this.basePath}/contracts/history/driver/${id}`,
        this.httpOptions
      )
      .pipe(retry(2));
  }
}
