import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, retry, throwError } from 'rxjs';
import { User } from '../../../../models/user/user';
import { Router } from '@angular/router';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import {  Vehicle } from '../../../../models/Vehicle/vehicle';
import { Experience } from 'src/app/models/Experience/Experience'; 

@Component({
  selector: 'app-signup-p1',
  templateUrl: './signup-p1.component.html',
  styleUrls: ['./signup-p1.component.css'],
})
export class SignupP1Component implements OnInit {
  user: User;
  display1: boolean = true;
  display2: boolean = false;
  display3: boolean = false;

  samePassword: boolean = false;
  signupForm: FormGroup;
  vehicle: Vehicle;
  experience: Experience;


  // basePath = 'http://localhost:3000/api/v1';
  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  constructor(
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.user = {} as User;
    this.vehicle={} as Vehicle;
    this.vehicle.brand= "-";
    this.vehicle.category="-";
    this.vehicle.photo_car="https://cdn-icons-png.flaticon.com/512/2554/2554969.png";
    this.vehicle.quantity=0;
    this.vehicle.type_car="-";
    this.experience={} as Experience;
    this.experience.job="-";
    this.experience.time="00:00:00"

    this.signupForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updatedOn: 'change',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(7)],
          updatedOn: 'change',
        },
      ],
      first_name: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      last_name: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      region: ['', { validators: [Validators.required], updatedOn: 'change' }],
      birthDate: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      phone: ['', { updatedOn: 'change' }],
      idCard: ['', { updatedOn: 'change' }],
      typeofuser: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      description: [''],
    });
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
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

  get description() {
    return this.signupForm.get('description');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get last_name() {
    return this.signupForm.get('last_name');
  }

  get first_name() {
    return this.signupForm.get('last_name');
  }

  //API error handling
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
  ngOnInit(): void {
    this.setPhoneValidation();
    this.setIdCardValidation();
  }

  registerData() {
    this.formToUser();
    if (this.signupForm.value.typeofuser == 'client') {
      this.http
        .post<User>(`${this.basePath}/clients`, this.user, this.httpOptions)
        .subscribe((res) => {
          console.log(res);
          alert('Registro exitoso');
        });
    } else {
      this.http
        .post(`${this.basePath}/drivers`, this.user, this.httpOptions)
        .subscribe((res:any) => {
          
          this.http
          .post(`${this.basePath}/vehicle/${res.id}`, this.vehicle, this.httpOptions)
          .subscribe((vehicle) =>{
            console.log(vehicle);
          });
          this.http
          .post(`${this.basePath}/experience/${res.id}`, this.experience, this.httpOptions)
          .subscribe((expe) =>{
            console.log(expe);
          });
          console.log(res);
          alert('Registro exitoso');
        });
    }
    this.router.navigate(['/login']);
  }

  formToUser() {
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.user.name = this.signupForm.value.first_name;
    this.user.lastname = this.signupForm.value.last_name;
    this.user.region = this.signupForm.value.region;
    this.user.birthdate = this.signupForm.value.birthDate;
    this.user.phone = this.signupForm.value.phone;
    // this.user.idCard = this.signupForm.value.idCard;
    // this.user.typeofuser = this.signupForm.value.typeofuser;
    this.user.username =
      this.signupForm.value.first_name + ' ' + this.signupForm.value.last_name;
    this.user.description = this.signupForm.value.description;
    this.user.photo = 'https://thumbs.dreamstime.com/b/icono-de-usuario-predeterminado-vectores-imagen-perfil-avatar-predeterminada-vectorial-medios-sociales-retrato-182347582.jpg';
  }

  onSubmit() {
    console.log(this.signupForm.valid);
  }

  setPhoneValidation() {
    const phoneControl = this.signupForm.get('phone');
    phoneControl?.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }

  setIdCardValidation() {
    const idControl = this.signupForm.get('idCard');
    idControl?.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }

  //No funcionan
  /*
  validatePassword() {

    if (this.signupForm.value.password === this.signupForm.value.confirmPassword) {
      this.samePassword = true;
      console.log("hola")
    }
    else {
      this.samePassword = false;
      console.log("chau")

    }
    console.log(this.signupForm.value.password);
    console.log(this.confirmPassword);
  }
  */
  /*
  isValidToCreate() {
    if (this.signupForm.valid==true && this.validatePassword()==true) {
      this.isValid = true;
    }
  }*/
}
