import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenStorage } from './features/auth/token.storage';
import { httpInterceptorProviders } from './http-interceptors';
import { FlashService } from './services/flash.service';
import { FlashComponent } from './shared/components/flash/flash.component';
import { PostService } from './services/post.service';

@NgModule({
  declarations: [
    AppComponent,
    FlashComponent
    // DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, TokenStorage, httpInterceptorProviders, FlashService, PostService],
  bootstrap: [AppComponent],
  entryComponents:[FlashComponent]
})
export class AppModule { }
