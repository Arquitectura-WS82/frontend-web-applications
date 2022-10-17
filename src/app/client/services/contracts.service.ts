import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  // Contracts Endpoint
  url: string = 'http://localhost:3000/api/v1';

  getHistory(clientId: number) {
    return this.http.get(
      `${this.url}/historyContracts?clientId=${clientId}&_expand=driver`
    );
  }
  getPending(clientId: number) {
    return this.http.get(
      `${this.url}/pendingContracts?clientId=${clientId}&_expand=driver`
    );
  }
}
