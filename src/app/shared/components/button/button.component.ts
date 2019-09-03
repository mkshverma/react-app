import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../fields.interface";

@Component({
  selector: 'app-button',
  template: `
  <div class="form-group" [formGroup]="group">
    <button type="submit" class="btn btn-primary">{{field.label}}</button>
  </div>
  `,
  styles: []
})
export class ButtonComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  
  constructor() { }

  ngOnInit() {
  }

}
