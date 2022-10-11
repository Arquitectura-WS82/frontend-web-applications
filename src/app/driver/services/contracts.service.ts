import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  // Contracts Endpoint
  url: string = 'http://localhost:3000/api/v1';

  getOffers(driverId: any) {
    return this.http.get(`${this.url}/offer-contracts?driver_id=${driverId}`);
  }
  getHistory(driverId: any) {
    return this.http.get(`${this.url}/history-contracts?driver_id=${driverId}`);
  }
  getPending(driverId: any) {
    return this.http.get(`${this.url}/pending-contracts?driver_id=${driverId}`);
  }
}
