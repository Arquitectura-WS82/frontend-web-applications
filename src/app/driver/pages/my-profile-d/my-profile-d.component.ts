import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-my-profile-d',
  templateUrl: './my-profile-d.component.html',
  styleUrls: ['./my-profile-d.component.css'],
})
export class MyProfileDComponent implements OnInit {
  jobs: any;
  user: any;
  comments: any;
  user_id: any;
  vehicle: any;

  constructor(private http: HttpClient, private router: Router) {}

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  ngOnInit(): void {
    //localStorage.setItem('currentUser', '5');
    if (localStorage.getItem('visitDriverId') != '-1')
      this.user_id = localStorage.getItem('visitDriverId');
    else this.user_id = localStorage.getItem('currentUser');
    localStorage.setItem('visitDriverId', '-1');

    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data;
    });

    this.getVehicle(this.user_id).subscribe((data: any) => {
      this.vehicle = data;
    });

    this.getJobs(this.user_id).subscribe((data: any) => {
      this.jobs = data;
    });
    this.getComments(this.user_id).subscribe((data: any) => {
      this.comments = data;
    });
  }


  
  getVehicle(id: any) {
    return this.http.get(`${this.basePath}/vehicle/${id}`);
  }

  getUser(id: any) {
    return this.http.get(`${this.basePath}/drivers/${id}`);
  }
  getJobs(id: number) {
    return this.http.get(`${this.basePath}/experience/${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}/comments/driver/${id}`);
  }
}
