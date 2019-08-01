import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenStorage } from './auth/token.storage';

@NgModule({
  declarations: [
    AppComponent,
    // DropdownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard, TokenStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
