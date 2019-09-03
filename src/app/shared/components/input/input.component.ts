import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../fields.interface";
@Component({
  selector: "app-input",
  template: `
  <div class="form-group" [formGroup]="group">
  <input class="form-control" [formControlName]="field.name" [placeholder]="field.label" [type]="field.inputType">
  <ng-container *ngFor="let validation of field.validations;">
  <span class="text-red" *ngIf="group.get(field.name).touched && group.get(field.name).hasError(validation.name)">{{validation.message}}</span>
  </ng-container>
  </div>
  `,
  // ngProjectAs="mat-error"
  styles: []
})
export class InputComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}