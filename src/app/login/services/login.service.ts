import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../../models/user/user';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // basePath = 'http://localhost:3000/api/v1';
  basePath: string = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Client-side errors || default error handling
      console.error('An error occurred: ${error.error.message}');
    } else {
      //Server-side errors || unsuccesful response error code returned from backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    //Return observable with error message to client
    return throwError('Something bad happened; please try again later.');
  }

  //get user by email
  emailExists(email: string): Observable<User> {
    return this.http
      .get<User>(`${this.basePath}?email=${email}`, this.httpOptions)

      .pipe(retry(2), catchError(this.handleError));
  }
}
