import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrierService } from '@app/services/CarrierService';
import { District, User } from '@models/user';
import { ClientService } from '@services/ClientService';
import { DistrictService } from '@services/DistrictService';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User;
  districts: District[];
  filteredDistricts: Observable<District[]> | undefined;

  samePassword: boolean = false;
  signupForm: FormGroup;

  currentYear = new Date().getFullYear();
  maxDate = new Date(this.currentYear - 18, 11, 31); 

  constructor(
    public formBuilder: FormBuilder,
    private clientService: ClientService,
    private carrierService: CarrierService,
    private districtService: DistrictService,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.user = {} as User;
    this.districts = [] as District[];

    this.signupForm = this.formBuilder.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'change',
        },
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(7)],
          updateOn: 'change',
        },
      ],
      first_name: [
        '',
        { validators: [Validators.required], updateOn: 'change' },
      ],
      last_name: [
        '',
        { validators: [Validators.required], updateOn: 'change' },
      ],
      birthdate: [
        '',
        { validators: [Validators.required], updateOn: 'change' },
      ],
      phone: ['', { updateOn: 'change' }],
      typeofuser: [
        '',
        { validators: [Validators.required], updateOn: 'change' },
      ],
      street: ['', { validators: [Validators.required], updateOn: 'change' }],
      district: ['', { validators: [Validators.required], updateOn: 'change' }],
      description: [''],
    });
  }

  private _filter(value: string): District[] {
    const filterValue = value.toLowerCase();

    return this.districts.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.setPhoneValidation();

    this.districtService.getDistricts().subscribe((res) => {
      this.districts = res;
    });

    this.filteredDistricts = this.signupForm
      ?.get('district')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
  }

  registerData() {
    this.formToUser();

    if (this.signupForm.value.typeofuser == 'client') {
      this.clientService
        .registerClient(this.user, this.signupForm.value.district.id)
        .subscribe((res) => {
          console.log(res);
          alert('Register successful, Client');
        });
    } else {
      this.carrierService
        .registerCarrier(this.user, this.signupForm.value.district.id)
        .subscribe((res) => {
          console.log(res);
          alert('Register successful, Driver');
        });
    }
    this.router.navigate(['/login']);
  }

  formToUser() {
    this.user.email = this.signupForm.value.email;
    this.user.password = this.signupForm.value.password;
    this.user.firstName = this.signupForm.value.first_name;
    this.user.lastName = this.signupForm.value.last_name;
    this.user.street = this.signupForm.value.street;
    this.user.birthdate = this.datePipe.transform(
      new Date(this.signupForm.value.birthdate),
      'yyyy-MM-dd'
    ) as string;
    this.user.phone = this.signupForm.value.phone;
    this.user.username =
      this.signupForm.value.first_name + ' ' + this.signupForm.value.last_name;
    this.user.description = this.signupForm.value.description;
    this.user.photoUrl =
      'https://thumbs.dreamstime.com/b/icono-de-usuario-predeterminado-vectores-imagen-perfil-avatar-predeterminada-vectorial-medios-sociales-retrato-182347582.jpg';
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
}
