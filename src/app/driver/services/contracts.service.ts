import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  // Contracts Endpoint
  url: string = 'http://localhost:3000/api/v1';

  getOffers(driverId: number) {
    return this.http.get(
      `${this.url}/offerContracts?driverId=${driverId}&_expand=client`
    );
  }
  getHistory(driverId: number) {
    return this.http.get(
      `${this.url}/historyContracts?driverId=${driverId}&_expand=client`
    );
  }
  getPending(driverId: number) {
    return this.http.get(
      `${this.url}/pendingContracts?driverId=${driverId}&_expand=client`
    );
  }
}
