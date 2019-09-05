import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../fields.interface";

@Component({
  selector: 'app-textarea',
  template: `
  <div class="form-group" [formGroup]="group" >
    <textarea [formControlName]="field.name" rows="3" class="form-control"></textarea>
  </div>
  `,
  styles: []
})
export class TextAreaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
