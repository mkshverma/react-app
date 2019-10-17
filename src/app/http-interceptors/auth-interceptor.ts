import { TokenStorage } from '../features/auth/token.storage';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: TokenStorage) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.auth.getToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      url: API_URL+req.url,
      headers: req.headers.set('Authorization', 'Bearer '+authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}