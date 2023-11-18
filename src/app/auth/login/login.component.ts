import { CarrierService } from 'src/app/services/CarrierService';
import { Observable, catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/ClientService';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { User } from '@models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginFormm!: NgForm;
  signInForm!: FormGroup;

  basePath = GlobalVariable.BASE_API_URL;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private carrierService: CarrierService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: [''],
      type: [''],
    });
  }

  login() {
    if (this.signInForm.value.type === 'client') {
      this.clientService
        .findAccount(
          this.signInForm.value.email,
          this.signInForm.value.password
        )
        .pipe(
          catchError((err: any, caught: Observable<User>) => {
            alert('Usuario o contraseña incorrecta');
            return caught;
          })
        )
        .subscribe((res: User) => {
          console.log(res);
          localStorage.setItem('currentUser', res.id.toString());
          localStorage.setItem('typeofuser', 'client');
          this.router.navigate(['/home-c']);
          alert('Welcome, client');
        });
    } else {
      this.carrierService
        .findAccount(
          this.signInForm.value.email,
          this.signInForm.value.password
        )
        .pipe(
          catchError((err: any, caught: Observable<User>) => {
            alert('Usuario o contraseña incorrecta');
            return caught;
          })
        )
        .subscribe((res: User) => {
          localStorage.setItem('currentUser', res.id.toString());
          localStorage.setItem('typeofuser', 'carrier');
          this.router.navigate(['/home-d']);
          alert('Welcome, carrier');
        });
    }
  }
}
