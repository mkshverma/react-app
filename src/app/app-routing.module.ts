import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.gaurd';

const routes: Routes = [
  {
    path: '',
    loadChildren: './features/frontend/frontend.module#FrontendModule'
  },
  {
    path: 'auth',
    loadChildren: './features/auth/auth.module#AuthModule'
  },
  {
    path: 'admin',
    loadChildren: './features/admin/admin.module#AdminModule',
    canActivate: [AuthGuard],
    canLoad: [AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
