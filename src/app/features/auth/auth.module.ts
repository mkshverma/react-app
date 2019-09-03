import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SharedFormModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent, 
    ForgotComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedFormModule
  ]
})
export class AuthModule { }
