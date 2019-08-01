import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DropdownDirective } from '../directives/dropdown.directive';
import { CollapseDirective } from '../directives/collapse.directive';

@NgModule({
  declarations: [
    AdminComponent,
    DropdownDirective,
    CollapseDirective
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
