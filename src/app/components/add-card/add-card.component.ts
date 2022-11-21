import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, retry, throwError } from 'rxjs';
import { Card } from '../../models/Card/card';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';

interface Vehicle {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
})
export class AddCardComponent implements OnInit {
  card: Card;
  user_id: any;
  IsCliente: boolean;
  form: any;
  AddForm: FormGroup;
  filteredVehicules: any;
  type_user: any;
  dataCliente = 'client';

  searchForm: FormGroup = this.formBuilder.group({
    Type_s: ['Bus', { updateOn: 'change' }],
    Size_s: ['Bus', { updateOn: 'change' }],
  });

  Type: Vehicle[] = [
    { value: 'vehicle-0', viewValue: 'Bus' },
    { value: 'vehicle-1', viewValue: 'Van' },
    { value: 'vehicle-2', viewValue: 'Cargo Truck' },
    { value: 'vehicle-3', viewValue: 'Truck' },
  ];

  basePath = GlobalVariable.BASE_API_URL;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', //Solo acepta json
    }),
  };

  constructor(
    //private fb: FormBuilder,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.card = {} as Card;
    this.IsCliente = true;
    this.AddForm = this.formBuilder.group({
      phone: ['', { updatedOn: 'change' }],
      title: ['', { validators: [Validators.required], updatedOn: 'change' }],
      type: ['', { validators: [Validators.required], updatedOn: 'change' }],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updatedOn: 'change',
        },
      ],
      direction: [
        '',
        { validators: [Validators.required], updatedOn: 'change' },
      ],
      postal: ['', { validators: [Validators.required, Validators.minLength(5)], updatedOn: 'change' }],
      name: ['', { validators: [Validators.required], updatedOn: 'change' }],
      numberCard: [
        '',
        { validators: [Validators.required, Validators.minLength(16), Validators.maxLength(16)], updatedOn: 'change' },
      ],
      date: ['', { validators: [Validators.required], updatedOn: 'change' }],
      cvv: ['', { validators: [Validators.required, Validators.minLength(3)], updatedOn: 'change' }],
    });
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
    this.user_id = localStorage.getItem('currentUser');
    this.type_user = localStorage.getItem('typeofuser');

    // this.getCards(this.user_id).subscribe((data: any) => {
    //   this.Cards_user = data;
    //   console.log(data);
    // });
    this.setPhoneValidation();
    this.setnumberCardValidation();
    this.setPostalCodeValidation();
    this.setCVVValidation();
    // this.form = this.fb.group({
    //   creditCard: [],
    //   creditCardDate: [],
    //   creditCardCvv: [],
    // });
  }
  // getCards(id: any) {
  //   return this.http.get(`${this.basePath}cards?id=${id}`);
  // }
  get phone() {
    return this.AddForm.get('phone');
  }
  get title() {
    return this.AddForm.get('title');
  }
  get type() {
    return this.AddForm.get('type');
  }
  get email() {
    return this.AddForm.get('email');
  }
  get direction() {
    return this.AddForm.get('direction');
  }
  get postal() {
    return this.AddForm.get('postal');
  }
  get name() {
    return this.AddForm.get('name');
  }
  get numberCard() {
    return this.AddForm.get('numberCard');
  }
  get date() {
    return this.AddForm.get('date');
  }
  get cvv() {
    return this.AddForm.get('cvv');
  }
  onSubmit() {
    console.log(this.AddForm.valid);
  }

  setPhoneValidation() {
    const phoneControl = this.AddForm.get('phone');
    phoneControl?.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }
  registerData() {
    if (this.type_user == this.dataCliente) {
      this.formToCard();
      console.log(this.card);
      this.http
        .post<Card>(
          `${this.basePath}/cardsClient/${this.user_id}/add`,
          this.card,
          this.httpOptions
        )
        .subscribe((res) => {
          alert('Registro exitoso');
        });
      this.router.navigate(['/settings-c/card-settings']);
    } else {
      this.formToCard();
      this.http
        .post<Card>(
          `${this.basePath}/cardsDriver/${this.user_id}/add`,
          this.card,
          this.httpOptions
        )
        .subscribe((res) => {
          alert('Registro exitoso');
        });
      this.router.navigate(['/settings-d/card-settings']);
    }
  }
  formToCard() {
    this.card.email = this.AddForm.value.email;
    this.card.holderName = this.AddForm.value.name;
    this.card.cardNumber = this.AddForm.value.numberCard;
    this.card.expirationDate = this.AddForm.value.date;
    this.card.cardNickname = this.AddForm.value.title;
    this.card.issuer = this.AddForm.value.type;
    this.card.zip = this.AddForm.value.postal;
    //console.log(this.card)
  }

  cancel() {
    if (localStorage.getItem('typeofuser') == 'client') {
      this.router.navigate(['/settings-c/card-settings']);
    } else if (localStorage.getItem('typeofuser') == 'driver') {
      this.router.navigate(['/settings-d/card-settings']);
    }
  }
  setnumberCardValidation() {
    const idControl = this.AddForm.get('numberCard');
    idControl?.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }
  setCVVValidation() {
    const idControl = this.AddForm.get('cvv');
    idControl?.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }
  setPostalCodeValidation() {
    const idControl = this.AddForm.get('postal');
    idControl?.setValidators([
      Validators.pattern('^[0-9]*$'),
      Validators.required,
    ]);
  }

  // listSearch() {
  //   this.getVehicules().subscribe((data: any) => {
  //     this.filteredVehicules = data;
  //   });
  //   console.log(this.filteredVehicules)
  // }

  // setPhoneValidation() {
  //   const phoneControl = this.signupForm.get('phone');
  //   phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  // }
  // get phone() {
  //   return this.signupForm.get('phone');
  // }
}
