import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontendRoutingModule } from './frontend-routing.module';
import { HomeComponent } from './home/home.component';
import { FrontendComponent } from './frontend.component';
import { PostComponent } from './post/post.component';
import { PostService } from '../services/post.service';
import { PostsResolver } from '../resolvers/posts.resolver';

@NgModule({
  declarations: [FrontendComponent, HomeComponent, PostComponent],
  imports: [
    CommonModule,
    FrontendRoutingModule,
  ],
  providers:[PostService, PostsResolver]
})
export class FrontendModule { }
