import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

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
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
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

  getContracts() {
    return this.http.get(`${this.url}`);
  }

  getOfferContract(userId: number) {
    return this.http.get(`${this.url}/offer/${userId}`);
  }

  getHistoryContract(userId: number, typeUser: string) {
    return this.http.get(`${this.url}/history/${typeUser}/${userId}`);
  }

  getPendingContracts(userId: number, typeUser: string) {
    return this.http.get(`${this.url}/pending/${typeUser}/${userId}`);
  }

  getUnreadNotifications(userId: number, typeUser: string) {
    return this.http.get(
      `${this.url}/unread-notifications/${typeUser}/${userId}`
    );
  }

  changeContractVisibility(idContract: number) {
    return this.http.put(`${this.url}/${idContract}/change-visible`, {});
  }

  changeNotificationStatus(idContract: number) {
    return this.http.put(
      `${this.url}/${idContract}/change-notification-status`,
      {}
    );
  }

  changeContractStatus(idContract: number, status: number) {
    return this.http.put(
      `${this.url}/${idContract}/update-status/${status}`,
      {}
    );
  }
}
