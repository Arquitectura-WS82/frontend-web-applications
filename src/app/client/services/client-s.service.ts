import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientSService {

  constructor(private http: HttpClient) { }

  url : string = "http://localhost:3000/api/v1";

  addOffer(offer:any) {
    return this.http.post(`${this.url}/offer-contracts`, offer);
  }


}
