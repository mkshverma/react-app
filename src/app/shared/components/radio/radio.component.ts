import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../fields.interface";

@Component({
  selector: 'app-radio',
  template: `
  <div class="form-group" [formGroup]="group">
  <label>{{field.label}}:</label>
  <label class="radio" *ngFor="let item of field.options">
    <input type="radio" [formControlName]="field.name" [value]="item"> {{item}}
  </label>
  </div>
  `,
  styles: []
})
export class RadioComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
