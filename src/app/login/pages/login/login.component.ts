import { CarrierService } from 'src/app/services/CarrierService';
import { Observable, catchError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/ClientService';
import { GlobalVariable } from 'src/app/shared/GlobalVariable';
import { User } from '../../../models/user';

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
        .findAccount('antbot@gmail.com', 'password')
        .pipe(
          catchError((err: any, caught: Observable<User>) => {
            // console.error('Error occurred:', err);
            alert('Usuario o contraseña incorrecta');
            return caught;
          })
        )
        .subscribe((res: User) => {
          localStorage.setItem('currentUser', res.id.toString());
          localStorage.setItem('typeofuser', 'client');
          this.router.navigate(['/home-c']);
          alert('Welcome, client');
        });
    } else {
      this.carrierService
        .findAccount('antbot@gmail.com', 'password')
        .pipe(
          catchError((err: any, caught: Observable<User>) => {
            // console.error('Error occurred:', err);
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

    /*
    this.http
      .get<Array<User>>(`${this.basePath}/client`, this.httpOptions)
      .subscribe((res: Array<User>) => {
        const data = res.find((client: any) => {
          if (
            client.email === this.signInForm.value.email &&
            client.password === this.signInForm.value.password
          ) {
            localStorage.setItem('currentUser', client.id);
            localStorage.setItem('typeofuser', 'client');
            this.logged = true;
            return true;
          } else return false;
        });
        console.log(this.signInForm.value.email);
        console.log(this.signInForm.value.password);
        if (data) {
          this.router.navigate(['/home-c']);
          alert('Welcome, client');
        }
        if (!this.logged) {
          this.http
            .get<any>(`${this.basePath}/carrier`, this.httpOptions)
            .subscribe((res) => {
              const data = res.find((driver: any) => {
                if (
                  driver.email === this.signInForm.value.email &&
                  driver.password === this.signInForm.value.password
                ) {
                  localStorage.setItem('currentUser', driver.id);
                  localStorage.setItem('typeofuser', 'driver');
                  console.log('prueba');
                  return true;
                } else return false;
              });
              console.log(this.signInForm.value.email);
              console.log(this.signInForm.value.password);
              if (data) {
                this.router.navigate(['/home-d']);
                alert('Welcome, driver');
              } else {
                alert('Usuario o contraseña incorrecta');
              }
            });
        }
      });  ¨
      */
  }
}
