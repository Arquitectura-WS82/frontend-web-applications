import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { _MatTabGroupBase } from '@angular/material/tabs';

@Component({
  selector: 'app-card-setting',
  templateUrl: './card-setting.component.html',
  styleUrls: ['./card-setting.component.css'],
})
export class CardSettingComponent implements OnInit {
  user_id: any;
  type_user: any;
  client = 'client';
  Cards_user: Array<any> = [];

  // basePath = 'http://localhost:3000/api/v1/';
  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.user_id = localStorage.getItem('currentUser');
    this.type_user = localStorage.getItem('typeofuser');
    this.getCard();
    console.log(this.type_user);
  }

  getCard() {
    if (this.type_user == this.client) {
      this.getCardsClient(this.user_id).subscribe((data: any) => {
        this.Cards_user = data;
      });
    } else {
      this.getCardsDriver(this.user_id).subscribe((data: any) => {
        this.Cards_user = data;
      });
    }
    console.log('error');
  }

  getCardsClient(id: any) {
    return this.http.get(`${this.basePath}/cardsClient/${id}`);
  }

  getCardsDriver(id: any) {
    return this.http.get(`${this.basePath}/cardsDriver/${id}`);
  }

  deleteCard(id: number) {
    if (this.type_user == this.client) {
      return this.http.delete(
        `${this.basePath}/cardsClient/${this.user_id}/delete/${id}`
      );
    } else {
      return this.http.delete(
        `${this.basePath}/cardsDriver/${this.user_id}/delete/${id}`
      );
    }
  }

  deleteItem(id: number) {
    this.deleteCard(id).subscribe((data: any) => {
      this.ngOnInit();
    });
  }

  goAddCard() {
    if (localStorage.getItem('typeofuser') == 'client') {
      this.router.navigate(['/settings-c/add']);
    } else {
      this.router.navigate(['/settings-d/add']);
    }
  }
}
