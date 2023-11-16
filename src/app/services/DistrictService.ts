import { District } from './../models/user';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  basePath: string = GlobalVariable.BASE_API_URL;

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

  getDistricts(): Observable<District[]> {
    return this.http
      .get<District[]>(`${this.basePath}/district`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getDistrictById(id: string): Observable<District> {
    return this.http
      .get<District>(`${this.basePath}/district/id/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getDistrictByName(name: string): Observable<District[]> {
    return this.http
      .get<District[]>(
        `${this.basePath}/district/name/${name}`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
}
