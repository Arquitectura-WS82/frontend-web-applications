import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class ClientSService {
  constructor(private http: HttpClient) {}

  basePath: string = GlobalVariable.BASE_API_URL + '/contracts';

  addOffer(clientId: any, driverId: any, offer: any) {
    return this.http.post(
      `${this.basePath}/add/${clientId}/${driverId}`,
      offer
    );
  }
}
