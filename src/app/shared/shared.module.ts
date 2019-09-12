import { NgModule } from '@angular/core';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicFieldDirective } from './components/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SelectComponent } from './components/select/select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './components/textarea/textarea.component';
import { FileComponent } from './components/file/file.component';
@NgModule({
  declarations: [
      InputComponent,
      ButtonComponent,
      RadioComponent,
      CheckboxComponent,
      DynamicFieldDirective,
      DynamicFormComponent,
      SelectComponent,
      TextAreaComponent,
      FileComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    RadioComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    SelectComponent,
    TextAreaComponent,
    FileComponent
  ],
  entryComponents:[

    InputComponent,
    ButtonComponent,
    RadioComponent,
    CheckboxComponent,
    DynamicFormComponent,
    SelectComponent,
    TextAreaComponent,
    FileComponent
  ]
})
export class SharedFormModule { }
