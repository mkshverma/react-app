import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenStorage } from './features/auth/token.storage';
import { httpInterceptorProviders } from './http-interceptors';
import { FlashService } from './services/flash.service';
import { FlashComponent } from './shared/components/flash/flash.component';
import { PostService } from './services/post.service';
import { AdminGuard } from './guards/admin.gaurd';
import { LoaderComponent } from './shared/components/loader/loader.componen';
import { LoaderService } from './services/loader.service';
import { environment } from '../environments/environment';
import { UploadService } from './services/upload.service';

@NgModule({
  declarations: [
    AppComponent,
    FlashComponent,
    LoaderComponent
    // DropdownDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AuthService, 
    AuthGuard, 
    TokenStorage, 
    httpInterceptorProviders, 
    FlashService, 
    PostService, 
    AdminGuard,
    LoaderService,
    UploadService
  ],
  bootstrap: [AppComponent],
  entryComponents:[FlashComponent,LoaderComponent]
})
export class AppModule { }
