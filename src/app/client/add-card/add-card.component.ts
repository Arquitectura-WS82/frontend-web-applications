import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { catchError, retry, throwError } from 'rxjs';
import { CardClient, Carddriver } from '../../models/Card/card';

interface Vehicle {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
  

  Card_client: CardClient;
  Card_Driver: Carddriver;

  user_id: any;
  IsCliente:boolean;
  // Cards_user: Array<any> = [];
  form: any;
  AddForm: FormGroup;
  filteredVehicules: any;
  type_user: any;
  dataCliente='client';
  

  searchForm: FormGroup = this.formBuilder.group({
    Type_s: ['Bus', {updateOn: 'change' }],
    Size_s: ['Bus', {updateOn: 'change' }]
  });

  Type: Vehicle[] = [
    {value: 'vehicle-0', viewValue: 'Bus'},
    {value: 'vehicle-1', viewValue: 'Van'},
    {value: 'vehicle-2', viewValue: 'Cargo Truck'},
    {value: 'vehicle-3', viewValue: 'Truck'},
  ];
  
  basePath = 'http://localhost:3000/api/v1/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(private fb: FormBuilder, public formBuilder: FormBuilder, private http: HttpClient, private router:Router) { 
    this.Card_client ={} as CardClient;
    this.Card_Driver ={} as Carddriver;
    this.IsCliente= true;
    this.AddForm = this.formBuilder.group({
      region: ['', { validators: [Validators.required], updatedOn: 'change' }],
      phone: ['', { updatedOn: 'change' }],
      title: ['', { validators: [Validators.required], updatedOn: 'change' }],
      type: ['', { validators: [Validators.required], updatedOn: 'change' }],
      email: ['', { validators: [Validators.required, Validators.email], updatedOn: 'change' }],
      Direction: ['', { validators: [Validators.required], updatedOn: 'change' }],
      postal: ['', { validators: [Validators.required], updatedOn: 'change' }],
      name: ['', { validators: [Validators.required], updatedOn: 'change' }],
      Number_Card: ['', { validators: [Validators.required], updatedOn: 'change' }],
      Date: ['', { validators: [Validators.required], updatedOn: 'change' }],
      CVV: ['', { validators: [Validators.required], updatedOn: 'change' }]
    })
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
    this.user_id=localStorage.getItem('currentUser')
    this.type_user=localStorage.getItem('typeofuser')

    // this.getCards(this.user_id).subscribe((data: any) => {
    //   this.Cards_user = data;
    //   console.log(data);
    // });
    this.setPhoneValidation();
    // this.form = this.fb.group({
    //   creditCard: [],
    //   creditCardDate: [],
    //   creditCardCvv: [],
    // });
  }
  // getCards(id: any) {
  //   return this.http.get(`${this.basePath}cards?id=${id}`);
  // }
  get region() {
    return this.AddForm.get('region');
  }
  get phone() {
    return this.AddForm.get('phone');
  }
  get title(){
    return this.AddForm.get('title');
  }
  get type(){
    return this.AddForm.get('type');
  }
  get email(){
    return this.AddForm.get('email');
  }
  get Direction(){
    return this.AddForm.get('Direction');
  }
  get postal(){
    return this.AddForm.get('postal');
  }
  get name(){
    return this.AddForm.get('name');
  }
  get Number_Card(){
    return this.AddForm.get('Number_Card');
  }
  get Date(){
    return this.AddForm.get('Date');
  }
  get CVV(){
    return this.AddForm.get('CVV');
  }
  onSubmit() {
    console.log(this.AddForm.valid);
  }
  
  setPhoneValidation() {
    const phoneControl = this.AddForm.get('phone');
    phoneControl?.setValidators([Validators.pattern('^[0-9]*$'), Validators.required]);
  }
  registerData() {
    if(this.type_user == this.dataCliente){
      this.formToCardClient();
      console.log(this.Card_client);
      this.http.post<CardClient>(`${this.basePath}paymentMethod`, this.Card_client, this.httpOptions).subscribe(
        (res) => {
          console.log(res);
          alert("Registro exitoso");
        }
      );
      this.router.navigate(["/setting"]);
    }
    else{
      
      this.formToCardDriver();
      console.log(this.Card_Driver);
      this.http.post<Carddriver>(`${this.basePath}paymentMethod`, this.Card_Driver, this.httpOptions).subscribe(
        (res) => {
          console.log(res);
          alert("Registro exitoso");
        }
      );
      this.router.navigate(["/setting"]);

    }
    
    // this.router.navigate(['/login']);

  }
  formToCardClient() {
    this.Card_client.email = this.AddForm.value.email;
    this.Card_client.cvv = this.AddForm.value.CVV;
    this.Card_client.ClientId = this.user_id;
    this.Card_client.holderName = this.AddForm.value.name;
    this.Card_client.cardNumber = this.AddForm.value.Number_Card;
    this.Card_client.expirationDate = this.AddForm.value.Date;
    this.Card_client.phone = this.AddForm.value.phone;
    this.Card_client.typeOfCard = this.AddForm.value.type;
    this.Card_client.postalCodeZip = this.AddForm.value.postal;
    this.Card_client.title = this.AddForm.value.title;
    console.log(this.Card_client.email);
    console.log(this.AddForm.value.title);
  }
  formToCardDriver() {
    this.Card_Driver.email = this.AddForm.value.email;
    this.Card_Driver.cvv = this.AddForm.value.CVV;
    this.Card_Driver.DriverId = this.user_id;
    this.Card_Driver.holderName = this.AddForm.value.name;
    this.Card_Driver.cardNumber = this.AddForm.value.Number_Card;
    this.Card_Driver.expirationDate = this.AddForm.value.Date;
    this.Card_Driver.phone = this.AddForm.value.phone;
    this.Card_Driver.typeOfCard = this.AddForm.value.type;
    this.Card_Driver.postalCodeZip = this.AddForm.value.postal;
    this.Card_Driver.title = this.AddForm.value.title;
    console.log(this.Card_client.email);
    console.log(this.AddForm.value.title);
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
