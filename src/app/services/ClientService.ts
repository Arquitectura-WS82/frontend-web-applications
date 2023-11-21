import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  basePath: string = GlobalVariable.BASE_API_URL;
  url = this.basePath + '/client';

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

  findAccount(email: string, password: string): Observable<User> {
    return this.http
      .get<User>(
        `${this.url}/searchEmailAndPassword/${email}/${password}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  registerClient(client: User, districtId: string): Observable<User> {
    return this.http
      .post<User>(
        `${this.url}/add/district/${districtId}`,
        JSON.stringify(client),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  updateClient(client: User, districtId: string): Observable<User> {
    return this.http
      .put<User>(
        `${this.basePath}/personal-data/client/${client.id}/district/${districtId}/`,
        JSON.stringify(client),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getClientById(id: any): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, this.httpOptions);
  }
}
