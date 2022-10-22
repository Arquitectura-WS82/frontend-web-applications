import { Component, Input, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  jobs:any;
  user:any;
  comments: any;
  id:any;
  constructor(private http: HttpClient, 
    private router: Router,
    route: ActivatedRoute) { 
      
      route.params.subscribe((params) => {
        this.id = params["id"];
      });

  }

  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  ngOnInit(): void {
      
    //localStorage.setItem('currentUser', '5');
    // if (localStorage.getItem("visitDriverId") != '-1')
    //   this.user_id = localStorage.getItem('visitDriverId')
    // else
    //   this.user_id = localStorage.getItem('currentUser')

    // localStorage.setItem('visitDriverId',"-1")
    this.getUser(this.id).subscribe((data: any) => {
      this.user = data[0];
      console.log(this.user)
    });
    this.getComments(this.id).subscribe((data: any) => {
      this.comments = data;
      console.log(this.comments)
    }
    );
  }
  
  getUser(id: any) {
    return this.http.get(`${this.basePath}drivers?_embed=comments&_embed=jobs&_embed=vehicles&id=${id}`);
  }
  getComments(id: any) {
    return this.http.get(`${this.basePath}comments?_expand=client&driverId=${id}`);
  }
  goRequestService(){
    this.router.navigate(['/request-service']);
  }

}
