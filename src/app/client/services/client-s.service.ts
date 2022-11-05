import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class ClientSService {
  constructor(private http: HttpClient) {}

  // basePath = 'http://localhost:3000/api/v1';
  basePath: string = GlobalVariable.BASE_API_URL + 'api/contracts';

  addOffer(clientId: any, driverId: any, offer: any) {
    return this.http.post(`${this.basePath}/add/client=${clientId}/driver=${driverId}`, offer);
  }
}
