import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
  } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../fields.interface";
import { InputComponent } from "./input/input.component";
import { ButtonComponent } from "./button/button.component";
import { SelectComponent } from "./select/select.component";
import { RadioComponent } from "./radio/radio.component";
import { CheckboxComponent } from "./checkbox/checkbox.component";
import { TextAreaComponent } from './textarea/textarea.component';
import { FileComponent } from './file/file.component';

  const componentMapper = {
    input: InputComponent,
    button: ButtonComponent,
    select: SelectComponent,
    radiobutton: RadioComponent,
    checkbox: CheckboxComponent,
    textarea: TextAreaComponent,
    file: FileComponent
    };
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type]
    )
    this.componentRef = this.container.createComponent(factory)
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }
}
