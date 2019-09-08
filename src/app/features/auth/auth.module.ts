import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { SharedFormModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent, 
    ForgotComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedFormModule
  ]
})
export class AuthModule { }
