import { Component } from '@angular/core';
import { 
  Router,
  RouterEvent,
  NavigationStart, 
  NavigationEnd, 
  NavigationCancel, 
  NavigationError 
} from '@angular/router';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DemoApp';

  constructor(private router: Router, loaderService: LoaderService){
    this.router.events.subscribe((event: RouterEvent) => {
    if (event instanceof NavigationStart) {
      loaderService.startLoading()
    }
    if (event instanceof NavigationEnd) {
      loaderService.stopLoading()
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      loaderService.stopLoading()
    }
    if (event instanceof NavigationError) {
      loaderService.stopLoading()
    }
    })
  }
}
