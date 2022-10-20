import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

// Components
import { HeaderComponent } from './login/header/header.component';
import { FooterComponent } from './login/footer/footer.component';
import { SignupP1Component } from './login/pages/signup/signup-p1/signup-p1.component';
import { SignupP2Component } from './login/pages/signup/signup-p2/signup-p2.component';
import { SignupP3Component } from './login/pages/signup/signup-p3/signup-p3.component';
import { HeaderCComponent } from './client/header-c/header-c.component';
import { HomeCComponent } from './client/home-c/home-c.component';
import { HeaderDComponent } from './driver/pages/header-d/header-d.component';
import { FootersComponent } from './components/footers/footers.component';
import { SearchVehicleComponent } from './client/search-vehicle/search-vehicle.component';

import { ContractsDComponent } from './driver/pages/contracts-d/contracts-d.component';
import { ContractDialogComponent } from './driver/components/contract-dialog/contract-dialog.component';
import { HomeDComponent } from './driver/pages/home-d/home-d.component';

import { MyProfileDComponent } from './driver/pages/my-profile-d/my-profile-d.component';
import { MyProfileCComponent } from './client/my-profile-c/my-profile-c.component';


import { ForgotPasswordComponent } from './login/pages/password/forgot-password/forgot-password.component';
import { RequestServiceComponent } from './client/request-service/request-service.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HeaderDComponent,
    HomeDComponent,
    SignupP1Component,
    SignupP2Component,
    SignupP3Component,
    HeaderCComponent,
    HomeCComponent,
    HeaderDComponent,
    ContractsDComponent,
    ContractDialogComponent,
    ForgotPasswordComponent,
    MyProfileDComponent,
    SearchVehicleComponent,
    MyProfileCComponent,
    SearchVehicleComponent,
    FootersComponent,
    RequestServiceComponent,
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
    MatTabsModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatBadgeModule,
    MatGridListModule,
    MatListModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
