import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contracts } from '../models/contracts/contract';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  uploadContracts() {
    // Contracts Endpoint
    const url = 'http://localhost:3000/api/v1/contracts';

    return this.http.get<Contracts>(url);
  }
}
