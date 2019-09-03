import { Component, OnInit } from "@angular/core";
import { FlashService } from 'src/app/services/flash.service';
@Component({
  selector: "app-flash",
  template: `
  <ng-container *ngFor="let m of messages; let i = index">
    <div class="alert alert-{{m.type}} alert-dismissible" role="alert"[ngStyle]="{'top.px': 10 + i*60}">
        <button type="button" class="close" (click)="onClose(i)" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        {{m.message}}
    </div>
</ng-container>
  `,
  styles: ['.alert{ margin: 0px auto;position: fixed; top: 10px; left: 20px; transition: all 0.5s ease-in-out 0s; z-index: 1031;animation-iteration-count: 1;}']
})
export class FlashComponent implements OnInit {
  messages = [];
  constructor(private flashService: FlashService) {}
  ngOnInit() {
      this.flashService.getMessages().subscribe(
          data => {
              this.messages.push(data);
          }
      )
  }

  onClose(index){
    this.messages.splice(index,1);
  }
}