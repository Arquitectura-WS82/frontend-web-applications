import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Component({
  selector: 'app-my-profile-c',
  templateUrl: './my-profile-c.component.html',
  styleUrls: ['./my-profile-c.component.css'],
})
export class MyProfileCComponent implements OnInit {
  jobs: any;
  user: any;
  comments: any;
  user_id: any;
  constructor(private http: HttpClient, private router: Router) {}

  //basePath = 'http://localhost:3000/api/v1/';

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');
    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data;
    });

    this.getJobs(this.user_id).subscribe((data: any) => {
      this.jobs = data;
      console.log(this.jobs);
    });
    this.getComments(this.user_id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  getUser(id: any) {
    return this.http.get(`${this.basePath}/clients/${id}`);
  }
  getJobs(id: any) {
    return this.http.get(`${this.basePath}/experience/${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}/comments/client/${id}`);
  }

  calculateAge(birthday: any) {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}






