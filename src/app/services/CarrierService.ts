import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experience } from '@app/models/experience';
import { Vehicle } from '@app/models/vehicle';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CarrierService {
  basePath: string = GlobalVariable.BASE_API_URL;
  url: string = GlobalVariable.BASE_API_URL + '/carrier';

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
        `${this.basePath}/carrier/searchEmailAndPassword/${email}/${password}`,
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  registerCarrier(user: User): Observable<User> {
    return this.http
      .post<User>(
        `${this.basePath}/carrier`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  getCarriers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getCarrierById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`, this.httpOptions);
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.url}/vehicles`, this.httpOptions);
  }

  getVehiclesByCarrierId(carrierId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(
      `${this.url}/${carrierId}/vehicles`,
      this.httpOptions
    );
  }

  getExperiencesByCarrierId(carrierId: number): Observable<Experience[]> {
    return this.http.get<Experience[]>(
      `${this.url}/${carrierId}/experiences`,
      this.httpOptions
    );
  }
}
