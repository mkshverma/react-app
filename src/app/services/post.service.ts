import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;
@Injectable()
export class PostService{

    constructor(private http: HttpClient){}

      getPosts() {
          return this.http.get(API_URL+'/posts');
      }
}