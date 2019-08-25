import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { FrontendComponent } from './frontend.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [FrontendComponent, HomeComponent, PostComponent],
  imports: [
    CommonModule,
    FrontendRoutingModule,
  ]
})
export class FrontendModule { }
