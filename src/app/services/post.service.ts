import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService{

    constructor(private http: HttpClient){}

      getPosts() {
          return this.http.get('/posts');
      }
}