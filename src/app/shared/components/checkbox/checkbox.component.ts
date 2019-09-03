import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../fields.interface";

@Component({
  selector: 'app-checkbox',
  template: `
  <div class="checkbox" [formGroup]="group" >
    <input [formControlName]="field.name" type="checkbox" [value]="field.value">{{field.label}}
  </div>
  `,
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
