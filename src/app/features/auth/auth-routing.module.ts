import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'register',
            component: RegisterComponent
        },
        {
            path: 'forgot-password',
            component: ForgotComponent
        }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
