import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormm!: NgForm

  signInForm!: FormGroup;

  basePath = 'http://localhost:3000/api/v1';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json' //Solo acepta json
    })
  }

  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })

  }

  login() {
    this.http.get<any>(`${this.basePath}/clients`, this.httpOptions).subscribe(res => {
      const data = res.find((client: any) => {
        if (client.email === this.signInForm.value.email && client.password === this.signInForm.value.password) {
          localStorage.setItem('currentUser', client.id);
          localStorage.setItem('typeofuser', 'client')
          return true;
        }
        else return false;
      });

      console.log(this.signInForm.value.email)
      console.log(this.signInForm.value.password);

      if (data) {
          this.router.navigate(['/home-c'])
          alert("Welcome, client")
      }

      else {
        this.http.get<any>(`${this.basePath}/drivers`, this.httpOptions).subscribe(res => {
          const data = res.find((driver: any) => {
            if (driver.email === this.signInForm.value.email && driver.password === this.signInForm.value.password) {
              localStorage.setItem('currentUser', driver.id);
              localStorage.setItem('typeofuser', 'driver')
              console.log("prueba")
              return true;
            }
            else return false;
          });
          console.log(this.signInForm.value.email)
          console.log(this.signInForm.value.password);

          if (data) {
              this.router.navigate(['/home-d'])
              alert("Welcome, driver")
          }
          else {
            alert("Usuario o contraseña incorrecta");
          }
        })

      }
    }
    )
  }



}



