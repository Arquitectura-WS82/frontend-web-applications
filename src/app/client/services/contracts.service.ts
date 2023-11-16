import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class ContractsService {
  constructor(private http: HttpClient) {}
  url: string = GlobalVariable.BASE_API_URL + '/contracts';

  getHistoryContracts(clientId: number) {
    return this.http.get(`${this.url}/history/client/${clientId}`);
  }

  getPendingContracts(clientId: number) {
    return this.http.get(`${this.url}/pending/client/${clientId}`);
  }

  changeContractVisibleToFalse(idContract: number) {
    return this.http.put(`${this.url}/${idContract}/change-visible`, {});
  }

  changeContractStatus(idContract: number, status: number) {
    return this.http.put(
      `${this.url}/${idContract}/update-status/${status}`,
      {}
    );
  }
}
