import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, retry, throwError } from 'rxjs';
import { User } from '../../../model/user';

@Component({
  selector: 'app-signup-p1',
  templateUrl: './signup-p1.component.html',
  styleUrls: ['./signup-p1.component.css']
})
export class SignupP1Component implements OnInit {

  user: User
  display1: boolean = true;
  display2: boolean = false;
  display3: boolean = false;

  signupForm: FormGroup

  basePath = 'http://localhost:3000/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(public formBuilder: FormBuilder, private http: HttpClient) {
    this.user = {} as User;

    this.signupForm = this.formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email], updatedOn: 'change'}],
      password: ['', {validators: [Validators.required, Validators.minLength(7)], updatedOn: 'change'}],
      name: ['', Validators.required],
      region: ['', Validators.required],
      birthDate: ['', Validators.required],
      number: ['', Validators.required],
      idCard: ['', Validators.required],
      typeofuser: ['', Validators.required],
      username: ['', Validators.required],
      description: ['', Validators.required]

    })
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password(){
    return this.signupForm.get('password');
  }
  //API error handling
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      //Client-side errors || default error handling
      console.error('An error occurred: ${error.error.message}');
    } else {
      //Server-side errors || unsuccesful response error code returned from backend
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`);
    }
    //Return observable with error message to client
    return throwError(
      'Something bad happened; please try again later.');
  }
  ngOnInit(): void {
    
  }
  

  validateForm1() {
   console.log(this.signupForm.value.email.valid);
    console.log(this.signupForm.valid);
    if(this.signupForm.value.email  && this.signupForm.value.password.valid){
      this.display1 = false;
      this.display2 = true;
      this.display3 = false;
    }

  }
  validateForm2() {
    this.display1 = false;
    this.display2 = false;
    this.display3 = true;

  }
  validateForm3(){
    this.formToUser();
    this.http.post<User>(this.basePath, this.user, this.httpOptions).subscribe(
      (res) => {
        console.log(res);
        alert("Registro exitoso");
      }
    )
  }

  formToUser(){
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.user.name = this.signupForm.value.name;
    this.user.region = this.signupForm.value.region;
    this.user.birthDate = this.signupForm.value.birthDate;
    this.user.number = this.signupForm.value.number;
    this.user.idCard = this.signupForm.value.idCard;
    this.user.typeofuser = this.signupForm.value.typeofuser;
    this.user.username = this.signupForm.value.username;
    this.user.description = this.signupForm.value.description;
  }

  onSubmit(){ 
    /*
    this.http.post<User>(this.basePath, JSON.stringify(this.user), this.httpOptions)
    .pipe(retry(2), catchError(this.handleError));
    console.log(this.user);
    alert("Registro exitoso");
    */
  }
  f1validate(){
    
  }

}
