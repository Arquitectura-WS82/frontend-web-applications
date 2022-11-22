import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PendingContract } from 'src/app/models/contracts/pending';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}
  // Contracts Endpoint
  // url: string = 'http://localhost:3000/api/v1';
  url: string = GlobalVariable.BASE_API_URL + '/contracts';

  getHistoryContracts(clientId: number) {
    return this.http.get(`${this.url}/history/client/${clientId}`);
  }

  getPendingContracts(clientId: number) {
    return this.http.get(`${this.url}/pending/client/${clientId}`);
  }

  // getPendingContracts(clientId: number) {
  //   return this.http.get(`${this.url}/pending/client/${clientId}`);
  // }

  // changePendingContractStatus(id: number, status: string) {
  //   return this.http.put(`${this.url}/pending/${id}/status/${status}`, {});
  // }

  // getContractById(id: number) {
  //   //return this.http.get<PendingContract>(`${this.url}/pendingContracts/${id}`);
  //   return this.http.get();
  // }

  // updatePendingContract(id: number, pendingContract: PendingContract) {
  //   return this.http.put<PendingContract>(
  //     `${this.url}/pendingContracts/${id}`,
  //     pendingContract
  //   );
  // }

  changeContractVisibleToFalse(idContract: number) {
    return this.http.put(`${this.url}/${idContract}/change-visible`, {});
  }

  changeContractStatus(idContract: number, status: number) {
    return this.http.put(`${this.url}/${idContract}/update-status/${status}`, {});
  }
}
