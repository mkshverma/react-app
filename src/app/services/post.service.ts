import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService{

    constructor(private http: HttpClient){}

      getPosts() {
          return this.http.get('/posts');
      }
      getPost(postId) {
          return this.http.get('/post/'+postId);
      }

      deletePost(postId) {
          return this.http.delete('/posts/'+postId);
      }

      createPost( post) {
          return this.http.post('/posts',post);
      }

      updatePost(postId, post) {
          return this.http.put('/posts/'+postId, post);
      }
}