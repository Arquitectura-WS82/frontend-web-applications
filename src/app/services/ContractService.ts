import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '@app/shared/GlobalVariable';
import { Contract } from '@models/contract';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  basePath: string = GlobalVariable.BASE_API_URL;
  url: string = GlobalVariable.BASE_API_URL + '/hiring/contracts';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side errors || default error handling
      console.error('An error occurred: ${error.error.message}');
    } else {
      // Server-side errors || unsuccesful response error code returned from backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    // Return observable with error message to client
    return throwError('Something bad happened; please try again later.');
  }

  addContract(
    contract: Contract,
    clientId: number,
    carrierId: number,
    districtFrom: string,
    districtTo: string
  ) {
    return this.http.post(
      `${this.url}/add/client/${clientId}/carrier/${carrierId}/districtFrom/${districtFrom}/districtTo/${districtTo}`,
      contract,
      this.httpOptions
    );
  }

  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.url}`);
  }

  getOfferContracts(userId: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.url}/offer/${userId}`);
  }

  getPendingContracts(
    userId: number,
    typeUser: string
  ): Observable<Contract[]> {
    return this.http.get<Contract[]>(
      `${this.url}/pending/${typeUser}/${userId}`
    );
  }

  getHistoryContracts(
    userId: number,
    typeUser: string
  ): Observable<Contract[]> {
    return this.http.get<Contract[]>(
      `${this.url}/history/${typeUser}/${userId}`
    );
  }

  getUnreadNotifications(
    userId: number,
    typeUser: string
  ): Observable<Contract[]> {
    return this.http.get<Contract[]>(
      `${this.url}/unread-notifications/${typeUser}/${userId}`
    );
  }

  changeContractVisibility(contract: Contract): Observable<Contract> {
    return this.http.patch<Contract>(
      `${this.url}/${contract.id}/change-visible`,
      contract
    );
  }

  changeNotificationStatus(contract: Contract): Observable<Contract> {
    return this.http.patch<Contract>(
      `${this.url}/${contract.id}/change-notification-status`,
      contract
    );
  }

  changeContractStatus(
    contract: Contract,
    status: string
  ): Observable<Contract> {
    return this.http.patch<Contract>(
      `${this.url}/${contract.id}/update-status/${status}`,
      contract
    );
  }
}
