import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Comment } from '@models/comment';
import { Injectable } from '@angular/core';
import { GlobalVariable } from '@app/shared/GlobalVariable';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  basePath: string = GlobalVariable.BASE_API_URL;
  url: string = GlobalVariable.BASE_API_URL + '/hiring/comments';

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

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}`);
  }
}
