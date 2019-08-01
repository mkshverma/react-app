import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  constructor(private el: ElementRef){}
  @HostListener('click') onOpen(){
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click',['$event']) onClose(event: MouseEvent){
    const clickedInside = this.el.nativeElement.contains(event.target);
    if(!clickedInside){
      this.isOpen = false;
    }
  }
}
