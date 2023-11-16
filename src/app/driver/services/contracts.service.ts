import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PendingContract } from 'src/app/models/contracts/pending';
import { OfferContract } from 'src/app/models/contracts/offer';
import { Contract } from 'src/app/models/contracts/contract';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}

  url: string = GlobalVariable.BASE_API_URL + '/contracts';

  getOfferContracts(driverId: number) {
    return this.http.get(`${this.url}/offer/driver/${driverId}`);
  }

  getHistoryContracts(driverId: number) {
    return this.http.get(`${this.url}/history/driver/${driverId}`);
  }

  getPendingContracts(driverId: number) {
    return this.http.get(`${this.url}/pending/driver/${driverId}`);
  }

  changeContractVisibleToFalse(idContract: number) {
    return this.http.put(`${this.url}/${idContract}/change-visible`, {});
  }

  changeContractStatusOfferToPending(contractId: number, driverId: number) {
    return this.http.put(
      `${this.url}/${contractId}/change-status-offer-to-pending/driver=${driverId}`,
      {}
    );
  }
}
