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

  // Contracts Endpoint
  // url: string = 'http://localhost:3000/api/v1';
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

  // ACCEPT CONTRACT

  // getOfferContractById(id: number) {
  //   return this.http.get<OfferContract>(`${this.url}/offerContracts/${id}`);
  // }

  // removeOfferContract(id: number) {
  //   return this.http.delete(`${this.url}/offerContracts/${id}`);
  // }

  // addPendingContract(pendingContract: PendingContract) {
  //   return this.http.post<PendingContract>(
  //     `${this.url}/pendingContracts`,
  //     pendingContract
  //   );
  // }

  // END ACCEPT CONTRACT

  // getPendingContracts(driverId: number) {
  //   return this.http.get(`${this.url}/pendingContracts?driverId=${driverId}`);
  // }

  // DECLINE

  // getPendingContractById(id: number) {
  //   return this.http.get<PendingContract>(`${this.url}/pendingContracts/${id}`);
  // }

  // updateOfferContract(id: number, offerContract: OfferContract) {
  //   return this.http.put<OfferContract>(
  //     `${this.url}/offerContracts/${id}`,
  //     offerContract
  //   );
  // }

  // END DECLINE

  // updatePendingContract(id: number, pendingContract: PendingContract) {
  //   return this.http.put<PendingContract>(
  //     `${this.url}/pendingContracts/${id}`,
  //     pendingContract
  //   );
  // }
}
