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
import { NgxCcModule } from 'ngx-cc';
import { MatSidenavModule } from '@angular/material/sidenav';

// Components
import { HeaderComponent } from './login/header/header.component';
import { FooterComponent } from './login/footer/footer.component';
import { SignupP1Component } from './login/pages/signup/signup-p1/signup-p1.component';
import { SignupP2Component } from './login/pages/signup/signup-p2/signup-p2.component';
import { SignupP3Component } from './login/pages/signup/signup-p3/signup-p3.component';
import { HeaderCComponent } from './client/pages/header-c/header-c.component';
import { HomeCComponent } from './client/pages/home-c/home-c.component';
import { HeaderDComponent } from './driver/pages/header-d/header-d.component';
import { FootersComponent } from './components/footers/footers.component';
import { SearchVehicleComponent } from './client/pages/search-vehicle/search-vehicle.component';

import { ContractsDComponent } from './driver/pages/contracts-d/contracts-d.component';
import { ContractDialogComponent } from './components/contract-dialog/contract-dialog.component';
import { HomeDComponent } from './driver/pages/home-d/home-d.component';

import { MyProfileDComponent } from './driver/pages/my-profile-d/my-profile-d.component';
import { MyProfileCComponent } from './client/pages/my-profile-c/my-profile-c.component';

import { ForgotPasswordComponent } from './login/pages/password/forgot-password/forgot-password.component';

import { NotificationsComponent } from './client/pages/notifications/notifications.component';
import { PayContractCComponent } from './client/pages/pay-contract-c/pay-contract-c.component';

import { CardSettingComponent } from './components/card-setting/card-setting.component';
import { AddCardComponent } from './components/add-card/add-card.component';

import { ContractsCComponent } from './client/pages/contracts-c/contracts-c.component';
import { EndContractComponent } from './driver/pages/end-contract/end-contract.component';
import { RequestServiceComponent } from './client/request-service/request-service.component';
import { SupportComponent } from './components/support/support.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SettingsDComponent } from './driver/pages/settings-d/settings-d.component';
import { SettingsCComponent } from './client/pages/settings-c/settings-c.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddCommentDialogComponent } from './components/add-comment-dialog/add-comment-dialog.component';
import { AddInfoOneComponent } from './components/add-info-one/add-info-one.component';

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
    NotificationsComponent,
    PayContractCComponent,
    CardSettingComponent,
    AddCardComponent,
    ContractsCComponent,
    EndContractComponent,
    RequestServiceComponent,
    SupportComponent,
    ProfileComponent,
    SettingsComponent,
    SettingsDComponent,
    SettingsCComponent,
    PageNotFoundComponent,
    AddCommentDialogComponent,
    AddInfoOneComponent,
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
    NgxCcModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
