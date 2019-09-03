import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../fields.interface";

@Component({
  selector: 'app-select',
  template: `
  <div class="form-group" [formGroup]="group">
    <label>{{field.label}}</label>
    <select [formControlName]="field.name">
      <option *ngFor="let item of field.options" [value]="item">{{item}}</option>
    </select>
  </div>
  `,
  styles: []
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
