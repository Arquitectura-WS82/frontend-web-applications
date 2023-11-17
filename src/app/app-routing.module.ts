import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractsCComponent } from './client/pages/contracts-c/contracts-c.component';
import { HomeCComponent } from './client/pages/home-c/home-c.component';
import { MyProfileCComponent } from './client/pages/my-profile-c/my-profile-c.component';
import { PayContractCComponent } from './client/pages/pay-contract-c/pay-contract-c.component';
import { SearchVehicleComponent } from './client/pages/search-vehicle/search-vehicle.component';
import { SettingsCComponent } from './client/pages/settings-c/settings-c.component';
import { RequestServiceComponent } from './client/pages/request-service/request-service.component';
import { AddCardComponent } from './components/add-card/add-card.component';
import { CardSettingComponent } from './components/card-setting/card-setting.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SupportComponent } from './components/support/support.component';
import { ContractsDComponent } from './driver/pages/contracts-d/contracts-d.component';
import { EndContractComponent } from './driver/pages/end-contract/end-contract.component';
import { HomeDComponent } from './driver/pages/home-d/home-d.component';
import { MyProfileDComponent } from './driver/pages/my-profile-d/my-profile-d.component';
import { SettingsDComponent } from './driver/pages/settings-d/settings-d.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home-c', component: HomeCComponent },
  { path: 'search', component: SearchVehicleComponent },
  { path: 'contracts-d', component: ContractsDComponent },
  { path: 'contracts-c', component: ContractsCComponent },
  { path: 'home-d', component: HomeDComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'my-profile-c', component: MyProfileCComponent },
  { path: 'my-profile-d', component: MyProfileDComponent },
  { path: 'add', component: AddCardComponent },
  { path: 'end-contract', component: EndContractComponent },
  { path: 'request-service/:id', component: RequestServiceComponent },
  { path: 'support', component: SupportComponent },
  { path: 'app-pay-contract-c', component: PayContractCComponent },
  { path: 'profile/:id', component: ProfileComponent },
  {
    path: 'settings-c',
    component: SettingsCComponent,
    children: [
      { path: 'card-settings', component: CardSettingComponent },
      { path: 'add', component: AddCardComponent },
    ],
  },
  {
    path: 'settings-d',
    component: SettingsDComponent,
    children: [
      { path: 'card-settings', component: CardSettingComponent },
      { path: 'add', component: AddCardComponent },
    ],
  },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
