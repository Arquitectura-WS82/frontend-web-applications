import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarrierService } from '@app/services/CarrierService';
import { District, User } from '@models/user';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
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

  basePath = GlobalVariable.BASE_API_URL;

  constructor(
    public formBuilder: FormBuilder,
    private clientService: ClientService,
    private carrierService: CarrierService,
    private districtService: DistrictService,
    private router: Router
  ) {
    this.user = {} as User;
    this.districts = [] as District[];

    districtService.getDistricts().subscribe((res) => {
      this.districts = res;
    });

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

    this.filteredDistricts = this.signupForm
      ?.get('district')
      ?.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
  }

  private _filter(value: string): District[] {
    const filterValue = value.toLowerCase();

    return this.districts.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  ngOnInit(): void {
    this.setPhoneValidation();
  }

  registerData() {
    this.formToUser();

    if (this.signupForm.value.typeofuser == 'client') {
      this.clientService.registerClient(this.user).subscribe((res) => {
        console.log(res);
        alert('Registro exitoso');
      });
    } else {
      this.carrierService.registerCarrier(this.user).subscribe((res) => {
        console.log(res);
        alert('Registro exitoso');
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
    this.user.birthdate = this.signupForm.value.birthdate;
    this.user.phone = this.signupForm.value.phone;
    this.user.username =
      this.signupForm.value.first_name + ' ' + this.signupForm.value.last_name;
    this.user.description = this.signupForm.value.description;
    this.user.photoUrl =
      'https://thumbs.dreamstime.com/b/icono-de-usuario-predeterminado-vectores-imagen-perfil-avatar-predeterminada-vectorial-medios-sociales-retrato-182347582.jpg';
    this.districtService.getDistrictById('1').subscribe((res) => {
      this.user.district = res;
    });
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
