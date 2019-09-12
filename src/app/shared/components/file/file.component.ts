import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../fields.interface';
import { FormGroup } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-file',
  template: `
  <div class="form-group" [formGroup]="group">
  <label class="btn btn-success" for="fileInput{{field.name}}">Choose {{field.label}}</label><br/>
  <input type="file" id="fileInput{{field.name}}" class="hidden" (change)="uploadFile($event.target.files)">{{field.value}}
  <input [formControlName]="field.name" type="hidden">
  <div class="img-responsive">
  <img [src]="imgSrc" *ngIf="imgSrc != ''" width="200"/>
  </div>
  <ng-container *ngFor="let validation of field.validations;">
  <span class="text-red" *ngIf="group.get(field.name).touched && group.get(field.name).hasError(validation.name)">{{validation.message}}</span>
  </ng-container>
  </div>
  `,
  styles: []
})
export class FileComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  imgSrc: String;
  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.group.controls[this.field.name].valueChanges.subscribe(v => {
      this.imgSrc = '/uploads/'+v;
    })
  }

  uploadFile(files: FileList){
    this.uploadService.doUpload(files.item(0)).subscribe(resp => {
      if(resp['status']){
        this.group.controls[this.field.name].setValue(resp['file'].filename);
      }
    })
  }

}
