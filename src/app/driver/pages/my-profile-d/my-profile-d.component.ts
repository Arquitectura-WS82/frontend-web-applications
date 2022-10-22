
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile-d',
  templateUrl: './my-profile-d.component.html',
  styleUrls: ['./my-profile-d.component.css']
})
export class MyProfileDComponent implements OnInit {
  jobs:any;
  user:any;
  comments:any;
  user_id:any;
  constructor(private http: HttpClient, private router: Router) { 

  }

  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  ngOnInit(): void {
      
    //localStorage.setItem('currentUser', '5');
    if (localStorage.getItem("visitDriverId") != '-1')
      this.user_id = localStorage.getItem('visitDriverId')
    else
      this.user_id = localStorage.getItem('currentUser')
    localStorage.setItem('visitDriverId',"-1")
    this.getUser(this.user_id).subscribe((data: any) => {
      this.user = data[0];
    });
    
    this.getJobs(this.user_id).subscribe((data: any) => {
      this.jobs = data;
      console.log(this.jobs)
    });
    this.getComments(this.user_id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments)
    });
    
  }
  
  getUser(id: any) {
    return this.http.get(`${this.basePath}drivers?id=${id}`);
  }
  getJobs(id: any) {
    return this.http.get(`${this.basePath}jobs?id=${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}comments?id=${id}`);
  }

}
