import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  // Contracts Endpoint
  url: string = 'http://localhost:3000/api/v1';

  getOffers() {
    return this.http.get(`${this.url}/offer-contracts`);
  }
  getHistory() {
    return this.http.get(`${this.url}/history-contracts`);
  }
  getPending() {
    return this.http.get(`${this.url}/pending-contracts`);
  }
}
