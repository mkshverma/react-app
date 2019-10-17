import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../services/loader.service';
import { Subscription } from 'rxjs';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-loader',
  template: '<div class="content" *ngIf="loading"><div class="lds-dual-ring"></div></div>',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy{
  loading: Boolean = true;
  loaderSub: Subscription;
  constructor(private router: Router,private loaderService: LoaderService){

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd) {
        this.loading = false;
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.loading = false;
      }
      if (event instanceof NavigationError) {
        this.loading = false;;
      }
      })
  }

  ngOnInit(){
     this.loaderSub = this.loaderService.loader.subscribe(value => {
          this.loading = value;
      })
  }

  ngOnDestroy(){
      this.loaderSub.unsubscribe();
  }
}
