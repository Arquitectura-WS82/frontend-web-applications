import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormm!: NgForm

  signInForm!: FormGroup;

  basePath = 'http://localhost:3000/api/v1/users';

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
    var typeofuser: any;
    this.http.get<any>(`${this.basePath}`, this.httpOptions).subscribe(res => {
      const data = res.find((user: any) => {
        if (user.email === this.signInForm.value.email && user.password === this.signInForm.value.password) {
          typeofuser = user.typeofuser;
          return true;
        }
        else return false;
      });
      console.log(this.signInForm.value.email)
      console.log(this.signInForm.value.password);

      if (data) {
        
        if (typeofuser == "client"){
          this.router.navigate(['/home-c'])
          alert("Welcome, client")
        }
        else {
          //this.router.navigate(['/home-d']);
          alert("Welcome, driver");
        }
      }
      else {
        alert("Usuario o contraseña incorrecta");
      }
    }
    )
  }

  

}
