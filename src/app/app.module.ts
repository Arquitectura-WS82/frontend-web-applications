import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { HeaderComponent } from './login/header/header.component';
import { FooterComponent } from './login/footer/footer.component';
import { SignupP1Component } from './login/pages/signup/signup-p1/signup-p1.component';
import { SignupP2Component } from './login/pages/signup/signup-p2/signup-p2.component';
import { SignupP3Component } from './login/pages/signup/signup-p3/signup-p3.component';
import { HeaderCComponent } from './client/header-c/header-c.component';
import { HomeCComponent } from './client/home-c/home-c.component';
import { MatSelectModule } from '@angular/material/select';
import { ForgotPasswordComponent } from './login/pages/password/forgot-password/forgot-password.component';
import { ForgotPasswordConfirmComponent } from './login/pages/password/forgot-password-confirm/forgot-password-confirm.component';
import {MatNativeDateModule} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    SignupP1Component,
    SignupP2Component,
    SignupP3Component,
    HeaderCComponent,
    HomeCComponent,
    ForgotPasswordComponent,
    ForgotPasswordConfirmComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
