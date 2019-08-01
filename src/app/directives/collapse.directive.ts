import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective {
  isOpen = false;
  @HostListener('click') onOpen(){
    this.isOpen = !this.isOpen;
    let nextElement = this.el.nativeElement.nextElementSibling;
    let parentEl = this.el.nativeElement.parentElement;
    // console.log(parentEl);
    if(this.isOpen){
      this.renderer.addClass(nextElement,'in');
      this.renderer.addClass(parentEl,'active');
    }else{
      this.renderer.removeClass(nextElement,'in');
      this.renderer.removeClass(parentEl,'active');
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer2){}
}
