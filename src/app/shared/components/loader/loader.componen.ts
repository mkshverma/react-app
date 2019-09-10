import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: '<div class="content" *ngIf="loading"><div class="lds-dual-ring"></div></div>',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy{
  loading: Boolean = true;
  loaderSub: Subscription;
  constructor(private loaderService: LoaderService){}

  ngOnInit(){
     this.loaderSub = this.loaderService.loader.subscribe(value => {
          this.loading = value;
      })
  }

  ngOnDestroy(){
      this.loaderSub.unsubscribe();
  }
}
