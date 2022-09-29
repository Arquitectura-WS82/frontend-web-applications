import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, retry, throwError } from 'rxjs';
import { User } from '../../../model/user';
import { Router } from '@angular/router';

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
  isValid: boolean = false;

  basePath = 'http://localhost:3000/api/v1/users';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private router:Router) {
    this.user = {} as User;

    this.signupForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email], updatedOn: 'change' }],
      password: ['', { validators: [Validators.required, Validators.minLength(7)], updatedOn: 'change' }],
      confirmPassword: ['', { validators: [Validators.required], updatedOn: 'change' }],
      name: ['', { validators: [Validators.required], updatedOn: 'change' }],
      region: ['', { validators: [Validators.required], updatedOn: 'change' }],
      birthDate: ['', { validators: [Validators.required], updatedOn: 'change' }],
      phone: ['', { updatedOn: 'change' }],
      idCard: ['', { updatedOn: 'change' }],
      typeofuser: ['', { validators: [Validators.required], updatedOn: 'change' }],
      username: ['', { validators: [Validators.required], updatedOn: 'change' }],
      description: ['']

    })

  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get name() {
    return this.signupForm.get('name');
  }

  get region() {
    return this.signupForm.get('region');
  }

  get birthDate() {
    return this.signupForm.get('birthDate');
  }

  get phone() {
    return this.signupForm.get('phone');
  }

  get idCard() {
    return this.signupForm.get('idCard');
  }

  get typeofuser() {
    return this.signupForm.get('typeofuser');
  }

  get username() {
    return this.signupForm.get('username');
  }

  get description() {
    return this.signupForm.get('description');
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
    this.setPhoneValidation();
    this.setIdCardValidation();
  }


  registerData() {
    this.formToUser();
    this.http.post<User>(this.basePath, this.user, this.httpOptions).subscribe(
      (res) => {
        console.log(res);
        alert("Registro exitoso");
      }
    );
    this.router.navigate(['/login']);

  }

  formToUser() {
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.user.name = this.signupForm.value.name;
    this.user.region = this.signupForm.value.region;
    this.user.birthDate = this.signupForm.value.birthDate;
    this.user.phone = this.signupForm.value.phone;
    this.user.idCard = this.signupForm.value.idCard;
    this.user.typeofuser = this.signupForm.value.typeofuser;
    this.user.username = this.signupForm.value.username;
    this.user.description = this.signupForm.value.description;
  }

  onSubmit() {
    console.log(this.signupForm.valid);
  }

  setPhoneValidation() {
    const phoneControl = this.signupForm.get('phone');
    phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  }

  setIdCardValidation() {
    const idControl = this.signupForm.get('idCard');
    idControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  }


  //No funcionan
  validatePassword(): boolean {
    return this.signupForm.value.password == this.signupForm.value.confirmPassword
  }
  isValidToCreate() {
    if (this.signupForm.valid==true && this.validatePassword()==true) {
      this.isValid = true;
    }
  }
  validateAge() {
    let today = new Date();
    let birthDate = new Date(this.signupForm.value.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    console.log(age);
    if (age < 18) {
      alert("Debes ser mayor de edad para registrarte");
    }
  }


}
