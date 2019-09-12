import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadService{

    constructor(private http: HttpClient){}

      doUpload(file: File) {
          var formData = new FormData();
          formData.append('image',file, file.name);
          return this.http.post('/upload', formData);
      }
}