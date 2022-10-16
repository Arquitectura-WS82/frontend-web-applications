import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  user_id= 1;
  Cards_user: Array<any> = [];

  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getCards(this.user_id).subscribe((data: any) => {
      this.Cards_user = data;
      console.log(data);
    });
  }
  getCards(id: any) {
    return this.http.get(`${this.basePath}cards?id=${id}`);
  }

}
