import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { ListPostComponent } from './list-post/list-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsResolver } from 'src/app/resolvers/posts.resolver';
import { SharedFormModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [PostsComponent, ListPostComponent, EditPostComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedFormModule
  ],
  providers: [PostsResolver]
})
export class PostsModule { }
