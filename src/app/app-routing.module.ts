import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/pages/login/login.component';
import { SignupP1Component } from './login/pages/signup/signup-p1/signup-p1.component';
import { SignupP2Component } from './login/pages/signup/signup-p2/signup-p2.component';
import { SignupP3Component } from './login/pages/signup/signup-p3/signup-p3.component';
import { HeaderComponent } from './login/header/header.component';
import { HomeCComponent } from './client/home-c/home-c.component';
import { ContractsDComponent } from './driver/pages/contracts-d/contracts-d.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'signup-p1', component: SignupP1Component },
  { path: 'signup-p2', component: SignupP2Component },
  { path: 'signup-p3', component: SignupP3Component },
  { path: 'home-c', component: HomeCComponent },
  { path: 'contracts-d', component: ContractsDComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
